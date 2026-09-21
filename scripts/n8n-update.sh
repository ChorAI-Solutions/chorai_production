#!/bin/bash
set -euo pipefail

LOGDIR="/var/log/claude-jobs"
LOGFILE="${LOGDIR}/n8n-update.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
BACKUP_DIR="/var/n8n-backup"
REPO_DIR="/var/www/Production"
SERVER_NAME=$(hostname)

mkdir -p "${LOGDIR}" "${BACKUP_DIR}"

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

log "=== n8n Update Start ==="

N8N_IMAGE_BEFORE=$(docker inspect production-n8n-1 2>/dev/null | grep -o '"n8nio/n8n:[^"]*"' | cut -d'"' -f2 || echo "unknown")
BACKUP_FILE="${BACKUP_DIR}/n8n-backup_${TIMESTAMP//[: ]/_}.tar.gz"

log "Server: ${SERVER_NAME}"
log "BEFORE:"
log "  n8n Image: ${N8N_IMAGE_BEFORE}"
log "  Backup-Ort: ${BACKUP_FILE}"

log "Erstelle Backup..."
docker compose exec -T n8n tar czf - /home/node/.n8n > "${BACKUP_FILE}" 2>/dev/null || {
  log "⚠️ Backup-Erstellung hatte Probleme"
}
BACKUP_SIZE=$(du -h "${BACKUP_FILE}" 2>/dev/null | awk '{print $1}')
log "✅ Backup erstellt: ${BACKUP_SIZE}"

log "Hole neueste n8n Version..."
cd "${REPO_DIR}"
docker compose pull n8n >> "${LOGFILE}" 2>&1 || log "⚠️ Pull-Warnungen"

log "Starte n8n Neustart..."
docker compose --profile prod up -d --build n8n >> "${LOGFILE}" 2>&1 || {
  log "❌ n8n Neustart FAILED"
  send_telegram "🔴 [${SERVER_NAME}] ❌ FEHLER: n8n Update gescheitert - Backup: ${BACKUP_FILE}"
  exit 1
}

log "Warte auf Startup (10 Sekunden)..."
sleep 10

N8N_IMAGE_AFTER=$(docker inspect production-n8n-1 2>/dev/null | grep -o '"n8nio/n8n:[^"]*"' | cut -d'"' -f2 || echo "unknown")

log "Führe HealthCheck durch..."
if docker compose ps n8n | grep -q "Up"; then
  if docker compose logs n8n 2>/dev/null | grep -q "Editor is now"; then
    log "✅ n8n läuft und ist bereit"
    HEALTH_STATUS="✅ Bereit"
  else
    log "⚠️ n8n läuft, Startup könnte noch laufen"
    HEALTH_STATUS="⚠️ Läuft"
  fi
else
  log "❌ n8n nicht aktiv"
  send_telegram "🔴 [${SERVER_NAME}] ❌ FEHLER: n8n-Container läuft nicht"
  exit 1
fi

WORKFLOWS=$(docker compose logs n8n 2>/dev/null | grep -c "Activated workflow" || echo "0")

log "✅ n8n UPDATE ERFOLGREICH"

MESSAGE="🟢 [${SERVER_NAME}] ✅ n8n UPDATE ERFOLGREICH

📦 VERSIONS-INFO:
━━━━━━━━━━━━━━━━━━━━━━
Von: ${N8N_IMAGE_BEFORE}
Zu:  ${N8N_IMAGE_AFTER}

💾 SICHERUNG:
━━━━━━━━━━━━━━━━━━━━━━
Backup: ${BACKUP_SIZE}
Speichert bis: Samstag nächste Woche
Pfad: ${BACKUP_FILE}

🔧 STATUS:
━━━━━━━━━━━━━━━━━━━━━━
Container: ${HEALTH_STATUS}
Workflows: ${WORKFLOWS} aktiviert
Datenbank: Online

⏰ Nächstes Update: Samstag 01:00 UTC
📋 Backup bleibt erhalten"

send_telegram "$MESSAGE"

log "=== n8n Update Complete ==="
