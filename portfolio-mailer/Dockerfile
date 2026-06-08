# Install PHP dependencies with Composer
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts

# Runtime: PHP built-in server (kept private behind Caddy)
FROM php:8.3-cli-alpine

WORKDIR /app

COPY --from=vendor /app/vendor ./vendor
COPY public ./public

EXPOSE 8080

# Serve only the public/ directory; Caddy forwards /api/contact here.
CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]
