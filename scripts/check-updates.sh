#!/bin/bash
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

LOGDIR="/var/log/claude-jobs"
LOGFILE="${LOGDIR}/check-updates.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
REPO_DIR="/var/www/Production"
SERVER_NAME=$(hostname)

mkdir -p "${LOGDIR}"

TELEGRAM_BOT_TOKEN=""
TELEGRAM_CHAT_ID=""
[[ -f "${REPO_DIR}/.env" ]] && {
  TELEGRAM_BOT_TOKEN=$(grep '^TELEGRAM_BOT_TOKEN=' "${REPO_DIR}/.env" 2>/dev/null | cut -d'=' -f2- || true)
  TELEGRAM_CHAT_ID=$(grep '^TELEGRAM_CHAT_ID=' "${REPO_DIR}/.env" 2>/dev/null | cut -d'=' -f2- || true)
}

log() {
  echo "[${TIMESTAMP}] $1" | tee -a "${LOGFILE}"
}

send_telegram() {
  [[ -z "${TELEGRAM_BOT_TOKEN}" || -z "${TELEGRAM_CHAT_ID}" ]] && return
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
    --data-urlencode "text=$1" >/dev/null 2>&1 || true
}

log "=== Weekly Check-Updates Start ==="

UBUNTU_BEFORE=$(lsb_release -ds 2>/dev/null || echo "Unknown")
DOCKER_BEFORE=$(docker --version 2>/dev/null | awk '{print $NF}' || echo "Unknown")
KERNEL_BEFORE=$(uname -r)

log "Server: ${SERVER_NAME}"
log "BEFORE Update:"
log "  Ubuntu: ${UBUNTU_BEFORE}"
log "  Docker: ${DOCKER_BEFORE}"
log "  Kernel: ${KERNEL_BEFORE}"

UPGRADABLE_COUNT=$(apt list --upgradable 2>/dev/null | tail -n +2 | wc -l)
PACKAGES_LIST=$(apt list --upgradable 2>/dev/null | tail -n +2 | cut -d'/' -f1 | head -10)

log "Running apt update && apt upgrade..."
apt-get update -y >> "${LOGFILE}" 2>&1
DEBIAN_FRONTEND=noninteractive apt-get upgrade -y >> "${LOGFILE}" 2>&1 || {
  log "❌ apt upgrade FAILED"
  send_telegram "🔴 [${SERVER_NAME}] ❌ FEHLER: Linux-Update gescheitert"
  exit 1
}

UBUNTU_AFTER=$(lsb_release -ds 2>/dev/null || echo "Unknown")
DOCKER_AFTER=$(docker --version 2>/dev/null | awk '{print $NF}' || echo "Unknown")
KERNEL_AFTER=$(uname -r)

log "AFTER Update:"
log "  Ubuntu: ${UBUNTU_AFTER}"
log "  Docker: ${DOCKER_AFTER}"
log "  Kernel: ${KERNEL_AFTER}"

log "Pulling Docker images..."
cd "${REPO_DIR}"
docker compose pull >> "${LOGFILE}" 2>&1 || log "⚠️ docker pull hatte Warnungen"

log "Neustart Docker Services..."
docker compose --profile prod up -d --build >> "${LOGFILE}" 2>&1 || {
  log "❌ docker compose FAILED"
  send_telegram "🔴 [${SERVER_NAME}] ❌ FEHLER: Docker-Update gescheitert"
  exit 1
}

sleep 5

RUNNING_SERVICES=$(docker compose ps --format json 2>/dev/null | grep -c '"State":"running"' || echo "0")
TOTAL_SERVICES=$(docker compose ps --format json 2>/dev/null | jq length)

log "✅ UPDATE ERFOLGREICH"
log "Services: ${RUNNING_SERVICES}/${TOTAL_SERVICES} running"

MESSAGE="🟢 [${SERVER_NAME}] ✅ WÖCHENTLICHE UPDATES ERFOLGREICH

📋 ZUSAMMENFASSUNG:
━━━━━━━━━━━━━━━━━━━━━━
System-Updates: ${UPGRADABLE_COUNT} Pakete
${PACKAGES_LIST}

🔄 VERSIONEN:
━━━━━━━━━━━━━━━━━━━━━━
Ubuntu: ${UBUNTU_BEFORE} ✓
Docker: ${DOCKER_BEFORE} → ${DOCKER_AFTER}
Kernel: ${KERNEL_BEFORE} → ${KERNEL_AFTER}

🐳 CONTAINER:
━━━━━━━━━━━━━━━━━━━━━━
Bilder aktualisiert
${RUNNING_SERVICES}/${TOTAL_SERVICES} Services läuft

⏰ Nächstes Update: Samstag 01:00 UTC"

send_telegram "$MESSAGE"
log "=== Update Complete ==="
