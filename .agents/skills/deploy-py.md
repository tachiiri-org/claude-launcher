# deploy-py command

## Goals

1. Verify `wrangler` is available and authenticated (`wrangler whoami`)
2. Read project `name` and `version` from `pyproject.toml`
3. Read `public_url` from `[tool.release]` in `pyproject.toml`; stop with instructions if empty
4. Run `uv build` and confirm it produces a wheel in `dist/`
5. Upload wheel to R2: `wrangler r2 object put tachiiri-releases/{name}-{version}.whl --file dist/{name}-{version}.whl`
6. Create `latest.json`: `{ "version": "{version}", "url": "{public_url}/{name}-{version}.whl" }`
7. Upload `latest.json` to R2: `wrangler r2 object put tachiiri-releases/{name}/latest.json --file latest.json`
8. Output the public wheel URL and `latest.json` URL

## Constraints

- Don't deploy from `main` branch
- Don't use pip directly; use `uv` for build
- Don't deploy to production Cloudflare Workers
- Don't push directly to main
