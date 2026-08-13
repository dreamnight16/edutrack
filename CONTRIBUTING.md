# Contributing to edutrack（世界线）

Thanks for your interest in contributing!

## Getting Started

```bash
git clone https://github.com/dreamnight16/edutrack.git
cd edutrack
npm install
npm run dev
```

## Development Workflow

1. Fork the repo and create a branch from `master`
2. Make your changes
3. Run `npm run typecheck` and `npm test` to verify
4. Add tests for new functionality
5. Commit using [Conventional Commits][conv] format
6. Push and open a pull request

## Commit Convention

```
feat: add comprehensive evaluation track page
fix: sanitize user query input
refactor: extract TrackCard component
test: add track data loader tests
docs: update README
```

Types: `feat` `fix` `refactor` `test` `docs` `chore` `perf` `ci`

## Code Style

- TypeScript with strict type checking (`npm run typecheck`)
- Functions under 50 lines; files under 800 lines
- Use Tailwind CSS utility classes for styling
- Follow the existing component organization under `src/components`
- Add Vitest tests for new data loaders and utilities

## Data & Content

Track data lives in `src/data/tracks/*.json`. When adding a new track:

- Follow the schema in `src/types/index.ts`
- Include key milestones, timeline, and resources
- Verify with `npm test`

## Pull Request Checklist

- [ ] All tests pass (`npm test`)
- [ ] Type check passes (`npm run typecheck`)
- [ ] New tests added for new behavior
- [ ] Track/resource data follows the existing JSON schema
- [ ] UI changes verified in the browser

## Questions?

Open a [discussion](https://github.com/dreamnight16/edutrack/discussions).

[conv]: https://www.conventionalcommits.org/
