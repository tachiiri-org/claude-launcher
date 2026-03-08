# setup command

> **Prerequisite:** `bootstrap.sh` must have been run before this command.

## Goals

1. Read CLAUDE.md
2. Verify working tree is clean
3. Create a new branch and switch to it
4. Verify auth status of wrangler
5. Verify auth status of GitHub
6. Verify availability of Codex via MCP
7. Verify availability of Serena via MCP; if unavailable output configuration instructions and stop; if available call `activate_project` with the current repository path
8. Call `activate_project` of Serena with the current repository path

## Constrains

- don't read application/source code files
- don't start development work
- don't use npm
