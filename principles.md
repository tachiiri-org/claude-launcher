# principles.md

## Architectural Principles

- Prioritize loose coupling between modules.
- Divide files by single responsibility.
- Design for scalability from the start.

## Role Perspectives

### front

- Frontend is presentation only.
- No business logic in UI.
- Use composition patterns only.
- Explicitly model loading and error states.
- Keep components stateless by default.
- Interact with domain only via BFF contracts.
- Accessibility is mandatory.
- Lazy-load non-critical UI.
- Wrap app routes with an ErrorBoundary.
- Avoid global state unless strictly necessary.

### bff

- One BFF per channel (pages, cli, api, mcp, etc.).
- Aggregate and transform data for the channel; adapter and gateway do not transform.
- Complete authentication at BFF; pass normalized principal to gateway.
- Apply channel-specific visibility control and early rejection.
- Do not rely on BFF permission decisions as authorization ground truth.
- BFF controls what is shown and passed; gateway controls what is allowed.

### gateway

- Accept requests per use case unit.
- Select one or more adapters to fulfill each use case.
- Own the final authorization decision.
- Do not transform data.
- Hold no provider-specific logic.
- Apply global-level rate limiting.
- Own the ordering and failure policy across multiple adapters.

### adapter

- One adapter per external service provider.
- Absorb provider-specific API differences.
- Apply provider-specific rate limiting.
- Handle retry, backoff, and circuit breaking.
- Normalize external data into gateway-facing canonical form.

### electron

- Renderer process follows front principles (UI only).
- Main process acts as local BFF: owns OS, file, and window management.
- Route cloud API calls through Cloudflare Gateway.
- Route local processing tasks to Python via IPC.
- Do not expose Python directly to renderer; mediate through main process.

### python

- Local processing engine; called exclusively from Electron.
- Not exposed to network or gateway.
- Handle batch processing (video, image) and repo launcher tasks.
- Stream progress back to Electron via IPC/stdio.
- No UI logic; output is data or status only.

### ops

- Provide principles, CLAUDE.md, and skills as shared context for Claude and Codex.
- Define and maintain settings.json and command definitions.
- Own branch strategy (main / dev / feature) across repositories.
- Own release and deploy command definitions.
- Designed to be pulled into other repositories as a development standard layer.
