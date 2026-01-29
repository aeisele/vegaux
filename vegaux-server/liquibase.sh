#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# Ensure postgres is running
if ! docker compose ps postgres --status running --quiet 2>/dev/null | grep -q .; then
    echo "Starting postgres..."
    docker compose up -d postgres
    echo "Waiting for postgres to be healthy..."
    until docker compose ps postgres --status healthy --quiet 2>/dev/null | grep -q .; do
        sleep 1
    done
fi

# Run liquibase with provided arguments, default to 'update'
docker compose run --rm liquibase "${@:-update}"
