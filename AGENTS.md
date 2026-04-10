# Agents – Leitfaden für den Kurs (Next.js + n8n)

Dieser Leitfaden zeigt dir, wie du in diesem Projekt schrittweise einen Chat‑Agent (später Voice‑Agent) baust und n8n einbindest. Alles ist für Windows, macOS und Linux vorbereitet.

## Agent: Neustart / Deploy nach Änderungen

**Verbindliche Regel für KI-Agenten und manuelle Arbeit am Repo:** Nach **jeder** abgeschlossenen Änderung am Anwendungscode (Next.js, Komponenten, API-Routen, `package.json` usw.) den **Web‑Stack neu ausliefern**, damit Produktion und Tests den aktuellen Stand sehen.

- **Produktion (Docker, Profil `prod`):** Immer Image neu bauen und Container starten (nicht nur `restart`, sonst läuft oft noch alter Build):
  ```bash
  cd /var/www/Production && docker compose --profile prod up -d --build web
  ```
- **Nur Konfiguration/Env ohne App-Code:** Genügt ggf. `docker compose --profile prod restart web`.
- **Lokal dev (Profil `dev`):** Entsprechend Hot-Reload beachten; bei Bedarf `docker compose --profile dev restart web-dev`.

Kurz: **Code geändert → `up -d --build web` ausführen** (bzw. gleichwertiges Target), danach bei Bedarf `/api/health` prüfen.

---

## Wartung & Updates (Standard‑Ablauf für Agenten)

**Verbindliche Regel:** Wenn du Wartung, Sicherheits‑ oder Versionsupdates durchführst oder der Nutzer danach fragt, orientiere dich an diesem Ablauf (Reihenfolge sinnvoll kombinieren, nicht jedes Mal alles zwingen). Nach Änderungen an **App‑Code** oder **`package.json`** gilt weiterhin oben: **`docker compose --profile prod up -d --build web`**.

### 1) Node.js / npm (Next.js‑Repo, `/var/www/Production`)

1. Im Projektroot: `npm audit` auswerten.
2. Zuerst `npm audit fix` (ohne `--force`), dann bei Bedarf gezielt Overrides in `package.json` (z. B. transitive Pakete wie `hono` / `@hono/node-server`), danach `npm install` / Lockfile konsistent halten.
3. `npm update` für Patches innerhalb der Semver‑Ranges.
4. **Node‑Version:** Dockerfile und `web-dev` nutzen **Node 22** (u. a. wegen `@prisma/streams-local`); lokal `.nvmrc` beachten, Setup: `scripts/check-server-tools.sh` (Major 22), README.
5. Validierung: `npm run build`; bei Docker‑Prod: Image neu bauen (siehe oben).

### 2) Systempakete (Server mit apt)

1. `sudo apt-get update` und `apt list --upgradable` prüfen.
2. `sudo DEBIAN_FRONTEND=noninteractive apt-get upgrade -y` ausführen.
3. Falls Ubuntu **Phased Updates** blockieren:  
   `sudo DEBIAN_FRONTEND=noninteractive apt-get -o APT::Get::Always-Include-Phased-Updates=true upgrade -y`
4. Wenn ein **neuer Kernel** installiert ist: Nutzer auf **Reboot** hinweisen bzw. nach Absprache `sudo reboot` (Downtime).

### 3) Docker‑Images (Root‑`docker-compose.yml`)

1. Tags in `docker-compose.yml` mit **Upstream‑Releases** abgleichen (n8n: [Releases](https://github.com/n8n-io/n8n/releases); bei Bedarf `docker compose pull` + `up -d` für betroffene Services).
2. Nach **Docker‑Engine‑Updates** ggf. `sudo systemctl restart docker` und Stack prüfen.

### 4) Supabase Self‑Hosted (`docker/supabase/`)

1. Image‑Tags mit [offiziellem Supabase‑Docker](https://github.com/supabase/supabase/tree/master/docker) vergleichen; lokale Anpassungen (Ports, Init‑Skripte, `storage-migrations`, Kong 2.8) beachten.
2. **Kong 2 → 3** ist ein **eigenes Migrationsprojekt** (neuer Entrypoint, Config) – nicht „nebenbei“ ohne Plan.
3. Nach Compose‑Änderungen: im Ordner `docker/supabase` mit passender `--env-file` `docker compose … up -d`; Health der Container prüfen.

### 5) Festplatte / Docker‑Speicher

1. Bei voller Platte: `docker system df`; sicher reclaimbar oft **Build‑Cache**:  
   `docker builder prune -af`
2. Ungenutzte Images (kein laufender Container):  
   `docker image prune -a -f`  
   **Nicht** Projekt‑`backups/`, DB‑Volumes oder `docker/supabase/volumes/db/data` löschen, sofern nicht ausdrücklich gewünscht.
3. Optionales lokales Artefakt: `.next` im Repo‑Root ist regenerierbar (`npm run build` / Docker‑Build).

### 6) Backups unter `backups/`

1. **Retention 90 Tage** (Dateien nach `mtime`): Skript `scripts/prune-backups.sh`  
   - manuell / Makefile: `make prune-backups`  
   - Cron: `/etc/cron.d/production-prune-backups` (täglich 03:00, Log `/var/log/prune-backups.log`)
2. Anpassung: Umgebungsvariablen `BACKUP_DIR`, `RETENTION_DAYS`.

### 7) Kurz‑Checkliste nach Wartung

- `npm audit` → 0 oder dokumentierte Restrisiken  
- `docker compose`‑Services / Healthchecks  
- `/api/health` (Web)  
- Bei Kernel‑Update: Reboot erledigt oder geplant  

---

## Voraussetzungen
- Repo geklont, `.env` via `make setup` erstellt (Vorlage & Meta-Daten: `env.template`)
- Stack läuft: `docker compose up -d --build`
- Erreichbar:
  - Web: `http://localhost:3000`
  - n8n: `http://localhost:5678` (Basic‑Auth aus `.env`)
  - Mail‑UI: `http://localhost:8025`

### Setup-Workflow
- `make setup` / `make setup-dev`: lokale Defaults (Scope `dev`).
- `make setup-prod`: produktive Werte mit TLS-/Domain-Feldern (`scope=prod`). Auf frischen Servern zuerst `sudo apt update && sudo apt install build-essential` ausführen, danach übernimmt `scripts/check-server-tools.sh` die Prüfung auf Docker, Compose, Git und Node.js/npm.
- `make setup-env scope=prod`: falls du dynamisch zwischen Scopes wechseln willst (bei Scope `prod` läuft ebenfalls der Dependency-Check nach der manuellen build-essential-Installation).
- Das Skript `scripts/setup-env.cjs` liest die `# @meta { ... }` Blöcke in `env.template`, schlägt pro Scope Defaults vor und schreibt `.env`. Enter übernimmt den Vorschlag, `.` setzt den Wert leer.
- Nach dem Setup prüft `post-setup`, ob `NEW_REMOTE_URL` gesetzt ist, und ruft bei Bedarf `make switch-remote NEW_REMOTE_URL=…` auf, um das Git-Remote automatisch umzustellen. Direkt danach sorgt `scripts/git-bootstrap.sh` dafür, dass `git config user.name`/`user.email` gesetzt sind, der Branch `main` heißt und `git push -u origin main` ausgeführt wird.

## Sicherheits‑Basics
- Admin‑Endpoints (z. B. `/api/admin/*` und `/api/webhooks/n8n`) sind per Header `X-Admin-Token` geschützt.
- Token in `.env` setzen (`ADMIN_TOKEN`) und in Requests mitschicken.

## Aktueller Stand im Repo
- Next.js (App Router) mit Tailwind
- API‑Routen:
  - `/api/health` (Liveness)
  - `/api/admin/ping` (Token‑geschützt)
  - `/api/webhooks/n8n` (Token‑geschützt; Echo‑Beispiel)
- Prisma + Postgres mit Modell `BlogPost`
- Docker Compose: `web`, `db`, `n8n`, `mailpit`

## Roadmap der Agenten
1) Chat‑Agent (Text): Next.js API‑Route `/api/chat` → n8n Webhook → Antwort zurück
2) Voice‑Agent (später): Streaming/SIP/WebRTC → n8n/LLM‑Kette → TTS zurück
3) Blog‑Automation: n8n erstellt/versendet Blogposts → `/api/admin/blog/*`

---

## 1) Chat‑Agent
Ziel: Eine einfache Chat‑HTTP‑Route, die Nachrichten an n8n weiterleitet und die Antwort zurückgibt.

### 1.1 n8n vorbereiten
- In n8n einen „Webhook“ Node anlegen
  - Methode: POST
  - Pfad: `chat`
  - Optional: Header `X-Admin-Token` prüfen (Function Node) → mit `.env` abgleichen
- LLM/Antwort generieren (z. B. OpenAI Node, Dummy Function, etc.)
- Response (Webhook Reply) Node: JSON `{ reply: "..." }`
- Test‑URL lokal: `http://localhost:5678/webhook/chat`

### 1.2 API‑Route in Next.js (Beispiel)
Erstelle `app/api/chat/route.ts` (geschützt via Token, Proxy zu n8n):

```ts
// app/api/chat/route.ts (Beispiel)
import { requireAdminToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    requireAdminToken(request);
  } catch (err) {
    return err as Response;
  }

  const body = await request.json().catch(() => ({}));
  const webhookUrl = process.env.N8N_WEBHOOK_URL ?? "http://n8n:5678/webhook/chat";

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  return Response.json(data, { status: res.status });
}
```

Hinweis: In Docker ist `n8n` per Servicenamen erreichbar. Außerhalb (z. B. lokal via cURL) nutzt du `http://localhost:5678/webhook/chat`.

### 1.3 Testen
- cURL (zsh/Bash):
```bash
curl -sS -H 'X-Admin-Token: <ADMIN_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"message":"Hallo Agent"}' \
  http://localhost:3000/api/chat
```
- Erwartung: `{ "reply": "..." }` aus dem n8n‑Flow

### 1.4 Optional: Client‑UI
- Einfache Eingabe in `app/page.tsx` oder neue Seite `app/chat/page.tsx`
- Request an `/api/chat` senden, Antwort anzeigen

---

## 2) Voice‑Agent (Ausblick)
- Transport: WebRTC, SIP (z. B. Twilio, Asterisk), oder Browser‑Audio Upload + TTS
- Server‑Seite: Streaming‑Endpoint (Edge‑fähig) oder Polling‑Loop
- n8n: Kette (ASR → NLU/LLM → Tools → TTS)
- Sicherheit: Weiterhin `X-Admin-Token` für Kontroll‑Endpoints

Empfehlung für später:
- `/api/voice` als Upgrade‑Pfad anlegen
- Evaluieren: WebRTC SFU/MCU vs. Anbieter (Twilio, LiveKit)

---

## 3) Blog‑Automation
- Ziel: Beiträge automatisiert über n8n erstellen/veröffentlichen
- Next.js Admin‑API (Token‑geschützt): `/api/admin/blog/create`
- n8n flow: generiert Content (LLM), ruft Admin‑API auf

Beispiel‑Payload (n8n → Next.js):
```json
{
  "title": "Mein erster automatischer Post",
  "content": "…",
  "published": true
}
```

Server‑Hinweis:
- In der Admin‑Route Prisma nutzen (`import { prisma } from "@/lib/db";`)
- Validierung + Token‑Check (`requireAdminToken`)

---

## Datenhaltung (optional)
Für Chat‑Verläufe/Analytik könnte ein Modell sinnvoll sein (nur Vorschlag, nicht umgesetzt):
```prisma
model MessageLog {
  id        String   @id @default(cuid())
  role      String   // user | assistant | system
  content   String
  createdAt DateTime @default(now())
}
```

---

## Testing & Troubleshooting
- Health: `http://localhost:3000/api/health`
- Token‑Check: `/api/admin/ping` (Header `X-Admin-Token`)
- n8n Basic‑Auth: in `.env` setzen und ggf. `docker compose restart n8n`
- Mailpit (lokal): `http://localhost:8025` (für Einladungen/Resets, falls User‑Management aktiv)
- Windows PowerShell: Header mit doppelten Quotes, z. B. `"X-Admin-Token: ..."`
- zsh: Tokens mit `!` in einfache Quotes setzen

---

## Cursor – sinnvolle Prompts
- „Implementiere eine neue Route `app/api/chat/route.ts`, die Body `{message}` akzeptiert, `requireAdminToken` nutzt und an `process.env.N8N_WEBHOOK_URL` proxyt. Tests via cURL hinzufügen.“
- „Erstelle `app/chat/page.tsx` mit einfachem Formular (Textarea + Button), das `/api/chat` aufruft und die Antwort rendert.“
- „Füge eine Admin‑Route zum Erstellen von Blogposts hinzu (`/api/admin/blog/create`) inkl. Zod‑Validierung.“
- „Baue einen Logging‑Layer, der Requests/Responses des Chat‑Agents in Prisma speichert.“

---

## Stil & Commits
- Code‑Stil: klare Namen, frühe Rückgaben, keine unnötigen try/catch
- Kommentare nur, wenn wirklich nötig (Rationalen, Caveats)
- Commits: kleine, sinnvolle Einheiten mit Klartext („Add /api/chat proxy to n8n“)

---

## Nützliche Kommandos
```bash
# Stack bauen & starten
docker compose up -d --build

# Logs
docker compose logs -f web
docker compose logs -f n8n

# Prisma (Migration deploy in Container)
docker compose exec web npx prisma migrate deploy --schema=prisma/schema.prisma

# n8n User‑Management zurücksetzen (falls Login/Setup hängt)
docker compose exec n8n n8n user-management:reset
```

Viel Erfolg – und baue iterativ! Starte mit `/api/chat` + n8n Webhook, teste per cURL, und erstelle dann die UI.
