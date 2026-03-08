# deploy-electron command

## Goals

- Package and publish an Electron app to GitHub Releases

## Steps

1. Verify GitHub auth: `gh auth status`
2. Read version from `package.json`
3. Run `bun run build` (type check + compile)
4. Run `bun run dist` (electron-builder package)
5. Determine release type:
   - On `main` branch → stable release
   - Other branches → pre-release (draft)
6. Create GitHub Release with `gh release create vX.Y.Z`
   - Add `--prerelease` flag if not on main
7. Upload built artifacts to the release:
   - `.exe`, `.dmg`, `.AppImage`
   - `latest.yml`, `latest-mac.yml`, `latest-linux.yml`
8. Output release URL

## Constraints

- Do not deploy to prod from non-main branches (use --prerelease)
- Do not use npm
