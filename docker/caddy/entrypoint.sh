#!/bin/sh
set -eu

SITE_DOMAIN=${SITE_DOMAIN:-}
ACME_EMAIL=${ACME_EMAIL:-}
N8N_DOMAIN=${N8N_DOMAIN:-}
PORTFOLIO_DOMAIN=${PORTFOLIO_DOMAIN:-}
ELPOLOLOCO_DOMAIN=${ELPOLOLOCO_DOMAIN:-}
POKEDEX_DOMAIN=${POKEDEX_DOMAIN:-}
JOIN_DOMAIN=${JOIN_DOMAIN:-}
SUPABASE_DOMAIN=${SUPABASE_DOMAIN:-}
SUPABASE_KONG_HOST=${SUPABASE_KONG_HOST:-}
SUPABASE_KONG_PORT=${SUPABASE_KONG_PORT:-8000}

if [ -z "$SITE_DOMAIN" ]; then
  echo "SITE_DOMAIN ist nicht gesetzt." >&2
  exit 1
fi

if [ -z "$ACME_EMAIL" ]; then
  echo "ACME_EMAIL ist nicht gesetzt." >&2
  exit 1
fi

ROOT_DOMAIN=${SITE_DOMAIN#www.}

cat <<EOF >/etc/caddy/Caddyfile
{
    email ${ACME_EMAIL}
}

https://${ROOT_DOMAIN} {
    encode gzip
    header Strict-Transport-Security "max-age=31536000"
    reverse_proxy web:3000
}

https://www.${ROOT_DOMAIN} {
    header Strict-Transport-Security "max-age=31536000"
    redir https://${ROOT_DOMAIN}{uri} permanent
}
EOF

if [ -n "$N8N_DOMAIN" ]; then
cat <<EOF >>/etc/caddy/Caddyfile

https://${N8N_DOMAIN} {
    encode gzip
    reverse_proxy n8n:5678
}
EOF
fi

if [ -n "$PORTFOLIO_DOMAIN" ]; then
  PORTFOLIO_ROOT=${PORTFOLIO_DOMAIN#www.}
cat <<EOF >>/etc/caddy/Caddyfile

https://${PORTFOLIO_ROOT} {
    encode gzip
    handle /api/contact* {
        reverse_proxy portfolio-mailer:8080
    }
    handle {
        reverse_proxy portfolio:3001
    }
}

https://www.${PORTFOLIO_ROOT} {
    encode gzip
    handle /api/contact* {
        reverse_proxy portfolio-mailer:8080
    }
    handle {
        reverse_proxy portfolio:3001
    }
}
EOF
fi

if [ -n "$ELPOLOLOCO_DOMAIN" ]; then
cat <<EOF >>/etc/caddy/Caddyfile

https://${ELPOLOLOCO_DOMAIN} {
    encode gzip
    reverse_proxy elpololoco:3002
}
EOF
fi

if [ -n "$POKEDEX_DOMAIN" ]; then
cat <<EOF >>/etc/caddy/Caddyfile

https://${POKEDEX_DOMAIN} {
    encode gzip
    reverse_proxy pokedex:3003
}
EOF
fi

if [ -n "$JOIN_DOMAIN" ]; then
  JOIN_ROOT=${JOIN_DOMAIN#www.}
cat <<EOF >>/etc/caddy/Caddyfile

https://${JOIN_ROOT} {
    encode gzip
    reverse_proxy join:3004
}

https://www.${JOIN_ROOT} {
    encode gzip
    redir https://${JOIN_ROOT}{uri} permanent
}
EOF
fi

if [ -n "$SUPABASE_DOMAIN" ]; then
  if [ -z "$SUPABASE_KONG_HOST" ]; then
    echo "SUPABASE_DOMAIN ist gesetzt, aber SUPABASE_KONG_HOST fehlt." >&2
    exit 1
  fi
cat <<EOF >>/etc/caddy/Caddyfile

https://${SUPABASE_DOMAIN} {
    encode gzip
    handle /mcp* {
        respond 403
    }
    reverse_proxy ${SUPABASE_KONG_HOST}:${SUPABASE_KONG_PORT}
}
EOF
fi

exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile

