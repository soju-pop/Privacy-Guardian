#!/bin/sh

cd infra && docker compose up -d

cd ../frontend && npm i && npm run dev

cd ../infra && docker compose down