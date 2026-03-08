# inspect command

## Goals

- make this repository less ambiguous for claude code
- reduce complexity and ambiguity of architecture and codes
- identify file tree misalignments with the system model
- flag possibilities for god files, classes, or utilities
- find lack of unit test
- divide each type, state, component by 1 file

## Constrains

- do not modify any code or files
- do not suggest adding docs (suggest modifying architecture or code instead)

## Steps

1. Review process of thinking to achieve goal in this session
2. List points you are confused
3. Write each issue to `issues/{yyyyMMdd_hhmmss}_{i}.md`.

## Constraints

- Work only from files already in the conversation context.
- Do not read, glob, or explore additional files.
- 1 markdown file per issue

## Output Format

```
# Suggestion

## What confused

-

## Caused by

-

## How should be

-

## How to refactor
```
