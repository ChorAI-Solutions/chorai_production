#!/usr/bin/env bash
# Prüft System-Updates und Docker-Compose-Konfiguration.
# Nutzung: bash scripts/check-updates.sh

set -euo pipefail

log() { printf '[check-updates] %s\n' "$1"; }
warn() { printf '[check-updates] WARN: %s\n' "$1" >&2; }

COMPOSE="${COMPOSE:-docker compose}"
COMPOSE_FILE="${1:-docker-compose.yml}"

log "Prüfe System und Docker Compose …"

# --- System-Updates (nur Anzeige, keine Installation) ---
if command -v apt-get >/dev/null 2>&1; then
  if sudo apt-get update -qq 2>/dev/null; then
    UPGRADABLE=$(apt list --upgradable 2>/dev/null | grep -c "upgradable" || true)
    if [[ "${UPGRADABLE:-0}" -gt 0 ]]; then
      log "System: ${UPGRADABLE} Paket(e) können aktualisiert werden:"
      apt list --upgradable 2>/dev/null | sed 's/^/  /'
    else
      log "System: Keine Paket-Updates verfügbar."
    fi
  else
    warn "apt-get update fehlgeschlagen oder keine Rechte – überspringe System-Check."
  fi
else
  log "Kein apt-get gefunden – System-Update-Check übersprungen."
fi

# --- Docker & Compose Version ---
if command -v docker >/dev/null 2>&1; then
  log "Docker: $(docker --version 2>/dev/null)"
  if docker compose version >/dev/null 2>&1; then
    log "Docker Compose: $(docker compose version 2>/dev/null)"
  else
    warn "Docker Compose Plugin nicht verfügbar."
  fi
else
  warn "Docker nicht gefunden."
fi

# --- Docker Compose Konfiguration validieren ---
if [[ -f "$COMPOSE_FILE" ]]; then
  if $COMPOSE -f "$COMPOSE_FILE" config --quiet 2>/dev/null; then
    log "Konfiguration: $COMPOSE_FILE ist gültig."
  else
    warn "Konfiguration: $COMPOSE_FILE ist ungültig oder Fehler bei der Validierung."
    exit 1
  fi
else
  warn "Datei nicht gefunden: $COMPOSE_FILE"
  exit 1
fi

log "Prüfung abgeschlossen."
