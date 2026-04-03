# Project Coding Rules (Non-Obvious Only)

- Browser-assisted changes must still preserve the existing POM transition contract: page methods return page objects after navigation.
- Validate flows against `test.config.ts` values rather than assuming Playwright `baseURL` or env-driven credentials exist.
- Do not optimize for parallel execution without redesigning account/data assumptions; the suite is intentionally single-worker.
- Dynamic registration tests are created from `testdata/data.json` at import time, so data shape changes alter collected tests immediately.
- Keep selectors compatible with the current accessibility-first pattern (`getByRole`, often `exact: true`) to minimize drift from existing specs.