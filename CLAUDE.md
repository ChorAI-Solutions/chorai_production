# CLAUDE.md — Repo-Leitfaden für Claude Code

Dieses Repo (`/var/www/Production`) ist ein **Multi-App-Monorepo** mit Docker-Compose-Orchestrierung. Mehrere eigenständige Web-Apps laufen hinter einem gemeinsamen Caddy-Reverse-Proxy, jeweils unter eigener Domain.

> **Siehe auch [AGENTS.md](AGENTS.md)** für den ausführlichen Wartungs-/Deploy-/Update-Leitfaden (Next.js, n8n, Supabase, apt, Docker-Speicher, Backups). Diese Datei dupliziert das nicht, sondern ergänzt das **Gesamtbild** und app-übergreifende Erkenntnisse.

## Apps & Struktur

| Verzeichnis | App | Stack | Port (intern) | Git |
|---|---|---|---|---|
| `chorai-app/` | Hauptseite chorai.de | Next.js + Prisma | 3000 | im Hauptrepo |
| `portfolio-app/` | waldemar-chorow.de | **Angular 21** (statisch) | 3001 | **Submodul** |
| `portfolio-mailer/` | Kontakt-Mailer fürs Portfolio | **PHP 8.3 + PHPMailer** | 8080 | im Hauptrepo |
| `elpololoco/` | Subdomain-Projekt | statisch | 3002 | **Submodul** |
| `pokedex/` | Subdomain-Projekt | statisch | 3003 | **Submodul** |

Weitere Compose-Services: `n8n` (Automatisierung/Mail), `caddy` (Reverse-Proxy + TLS), `mailpit` (nur `dev`-Profil, Mail-Catcher), Supabase (in `docker/supabase/`).

### Compose-Profile
- **`prod`** — alle Produktions-Services. Deploy: `docker compose --profile prod up -d --build <service>`
- **`dev`** — `web-dev` (Hot-Reload) + `mailpit`
- **`n8n`** — n8n separat zuschaltbar

## Submodule (wichtig!)

`portfolio-app`, `elpololoco`, `pokedex` sind **Git-Submodule** (eigene Repos auf GitHub). Konsequenzen beim Arbeiten:

- Änderungen an Submodul-Code: **zuerst im Submodul** committen+pushen, **dann** im Hauptrepo den neuen Submodul-Pointer committen.
  ```bash
  cd portfolio-app && git add … && git commit && git push origin master
  cd .. && git add portfolio-app && git commit   # aktualisiert den Pointer
  ```
- `portfolio-app` trackt Branch **`master`** (nicht `main`). elpololoco/pokedex tracken `main`.
- Ein „dirty submodule" im Root-`git status` (` m portfolio-app`) heißt: im Submodul gibt es uncommittete/ungepushte Änderungen.

## Portfolio-App (Angular)

- **Statische SPA**, gebaut mit `ng build`, in Prod via `http-server` ausgeliefert (`portfolio-app/Dockerfile`) — **kein** Node-SSR, **kein** PHP im Container.
- `node_modules` ist im Submodul **nicht eingecheckt** → vor lokalem Typecheck/Build/Serve immer `cd portfolio-app && npm install`. Fehlt es, melden IDE-Diagnostics massenhaft `Cannot find module '@angular/...'` — das ist **kein Code-Fehler**, nur fehlende Installation.
- Verifikation lokal: `npx tsc --noEmit -p tsconfig.app.json` (Typecheck) bzw. `npx ng build` (voller Build). Dev-Server: `npx ng serve --port 4200`.
- Reactive Forms statt template-driven im Kontaktformular (`src/app/layout/contact/`). E-Mail-Validierung verlangt TLD ≥ 2 Buchstaben: `^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$` (Angulars `Validators.email` ist hier zu lax).
- i18n: `public/i18n/{de,en}.json`, ngx-translate. Neue UI-Texte **immer in beiden** Sprachen ergänzen.
- Scroll-Verhalten zentral in `src/app/services/scroll.service.ts` (`scrollTo(section)` / `scrollToTop()`); navigiert von Unterseiten erst zur Startseite.
- AOS (Animate-On-Scroll) ist eingebunden: `AOS.init()` in `app.ts` (`ngAfterViewInit`), CSS-Import in `src/styles.scss`, Animationen über `data-aos="…"`-Attribute direkt am Element.

## Kontaktformular → E-Mail (PHP-Mailer)

Das Portfolio-Kontaktformular sendet an einen **separaten PHP-Container**, nicht über das statische Portfolio-Image.

- **Flow:** Angular `POST /api/contact` → Caddy routet `/api/contact*` → `portfolio-mailer:8080` → PHPMailer → SMTP.
- **Caddy-Routing:** in `docker/caddy/entrypoint.sh`, `handle /api/contact*` vor dem allgemeinen `handle` (root- *und* www-Block).
- **Mailer:** `portfolio-mailer/public/api/contact.php` — serverseitige Validierung (spiegelt die Angular-Validatoren), Honeypot-Feld `website`, Betreff „Kontakt", **Reply-To** = Absender aus dem Formular, Empfänger = `CONTACT_TO`.
- **Konfiguration (alles über `.env`):**
  `CONTACT_SMTP_HOST/PORT/USER/PASS`, `CONTACT_FROM`, `CONTACT_TO`, `CONTACT_ALLOWED_ORIGINS`.
  Gmail benötigt ein **App-Passwort** (2FA aktiv); `From` muss die authentifizierte Mailbox sein, sonst schreibt Gmail um / Mail wird als Spam verworfen.
- `vendor/` ist nicht eingecheckt (`.gitignore`), wird im Docker-Build via Composer erzeugt.
- **Deploy:** `docker compose --profile prod up -d --build portfolio-mailer caddy`

> **`.env` enthält Secrets und ist gitignored** — niemals committen, niemals Inhalt ausgeben. Beispiel-Variablen stehen in `.env.example` / `env.template`.

## Deploy-Regel (verbindlich, vgl. AGENTS.md)

Nach Code-Änderungen den betroffenen Service **neu bauen**, nicht nur restart:
```bash
docker compose --profile prod up -d --build <service>
```
- chorai-app: `web` (danach `/api/health` prüfen)
- portfolio: `portfolio`
- Mailer: `portfolio-mailer` (+ `caddy` bei Routing-Änderung)

## Verifikation / Testing

- **Angular:** Typecheck + Build wie oben. `node_modules` muss installiert sein.
- **Browser-Verifikation** (Layout/Animationen): In dieser Umgebung ist standardmäßig kein Browser installiert. Playwright + Chromium lassen sich bei Bedarf installieren (`npm i -D playwright && npx playwright install --with-deps chromium`), danach headless gegen den Dev-Server prüfen. **Nach Gebrauch wieder entfernen** — Playwright gehört nicht in `package.json` des Projekts.
- **PHP-Mailer:** Container bauen (`docker compose --profile prod build portfolio-mailer`) validiert Composer + PHP-Syntax. Endpoint-Verhalten (405/400/422) lässt sich ohne echten SMTP per `curl` testen; echter Versand braucht gültige SMTP-Credentials.

## Konventionen

- Commit-Messages: Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`).
- UI-Text-Änderungen am Portfolio immer **de + en** pflegen.
- Layout-CSS am Kontaktformular: `.contact-form` ist `flex-column` — alle Formularfelder liegen seit dem Reactive-Forms-Umbau **innerhalb** des `<form>`. Mobile-Regeln, die früher auf alle `<p>` zielten, müssen auf `.field-label` eingegrenzt sein, sonst verschwindet der Privacy-Text.
