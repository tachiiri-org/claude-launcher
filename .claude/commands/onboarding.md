# onboarding command

## Goals

- understand how to behave

## Steps

1. Read CLAUDE.md
2. Verify working tree is clean
3. Read last 10 commit logs
4. Classify repository role (front / bff / gateway / adapter)
5. Ask human goals
6. Instruct codex to achieve goals with 'implement' skill via MCP
7. Codex returns reply after implemention and commit
8. Consider codex achieves goals with reading git
9. Modify codes if needed
10. Suggest review command

## Constrains

- don't read codes
- don't change codes
- no authentication checks
- no tool installation
- don't start development work
- don't use npm
