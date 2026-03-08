# deploy-ts command

## Goals

1. Verify the current branch is not `main`
2. Run `npx wrangler whoami` to confirm Cloudflare auth
3. Run `bun run deploy:dev` to deploy to staging
4. Output the deployed worker URL

## Constraints

- Don't deploy from the main branch
- Don't use wrangler directly; use `bun run deploy:dev` only
- Don't deploy to production; staging only
