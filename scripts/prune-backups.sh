#!/usr/bin/env bash
# Löscht Dateien unter backups/, die älter als RETENTION_DAYS Tage sind (mtime).
# Aufruf: manuell, via cron oder: make prune-backups

set -euo pipefail

readonly scriptDir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly repoRoot="$(cd "${scriptDir}/.." && pwd)"
readonly backupDir="${BACKUP_DIR:-${repoRoot}/backups}"
readonly retentionDays="${RETENTION_DAYS:-90}"

log() { printf '[prune-backups] %s\n' "$1"; }

if [[ ! -d "${backupDir}" ]]; then
  log "Verzeichnis fehlt, nichts zu tun: ${backupDir}"
  exit 0
fi

mapfile -t oldFiles < <(find "${backupDir}" -type f -mtime "+${retentionDays}" 2>/dev/null || true)

if [[ "${#oldFiles[@]}" -eq 0 ]]; then
  log "Keine Dateien älter als ${retentionDays} Tage in ${backupDir}"
  exit 0
fi

for path in "${oldFiles[@]}"; do
  log "Entferne: ${path}"
  rm -f -- "${path}"
done

log "Fertig (${#oldFiles[@]} Datei(en))."
