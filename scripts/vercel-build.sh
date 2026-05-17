#!/bin/bash
export DATABASE_URL=file:./dev.db
npx prisma generate --schema=backend/prisma/schema.prisma
npx prisma db push --schema=backend/prisma/schema.prisma
npx tsx backend/prisma/seed.ts
npm run build
cp backend/prisma/dev.db .next/server/prisma-dev.db
