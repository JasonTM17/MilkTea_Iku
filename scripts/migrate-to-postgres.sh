#!/usr/bin/env bash
# ----------------------------------------------------------------------------
#  migrate-to-postgres.sh — switch MilkTea Iku from SQLite to PostgreSQL
# ----------------------------------------------------------------------------
#  Prerequisites:
#    1. Provisioned Postgres (Vercel Postgres / Neon / Supabase / RDS).
#    2. DATABASE_URL set to the postgres:// connection string.
#    3. Backup your SQLite data if you intend to keep it.
#
#  Usage:
#    DATABASE_URL="postgresql://..." ./scripts/migrate-to-postgres.sh
# ----------------------------------------------------------------------------
set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "::error:: DATABASE_URL is not set." >&2
  echo "Example: DATABASE_URL=\"postgresql://user:pass@host:5432/milktea?sslmode=require\" $0" >&2
  exit 1
fi

if [[ "$DATABASE_URL" != postgres* ]]; then
  echo "::error:: DATABASE_URL must start with postgresql:// or postgres://." >&2
  exit 1
fi

SCHEMA_DEV="backend/prisma/schema.prisma"
SCHEMA_PG="backend/prisma/schema.postgres.prisma"
BACKUP="backend/prisma/schema.sqlite.prisma.bak"

if [[ ! -f "$SCHEMA_PG" ]]; then
  echo "::error:: Postgres schema not found: $SCHEMA_PG" >&2
  exit 1
fi

echo "→ Backing up SQLite schema → $BACKUP"
cp "$SCHEMA_DEV" "$BACKUP"

echo "→ Activating Postgres schema"
cp "$SCHEMA_PG" "$SCHEMA_DEV"

echo "→ Generating Prisma client"
npx prisma generate --schema="$SCHEMA_DEV"

echo "→ Pushing schema to Postgres (deploy migrations)"
if [[ -d "backend/prisma/migrations" ]]; then
  npx prisma migrate deploy --schema="$SCHEMA_DEV"
else
  echo "  (no migrations folder — using db push for first-time bootstrap)"
  npx prisma db push --schema="$SCHEMA_DEV"
fi

echo
echo "✓ Migration complete."
echo "  Next steps:"
echo "    1. Re-seed if needed: npm run db:seed"
echo "    2. Verify: npx prisma studio --schema=$SCHEMA_DEV"
echo "    3. Commit the new $SCHEMA_DEV (overwriting the SQLite version)"
echo "    4. To roll back: cp $BACKUP $SCHEMA_DEV"
