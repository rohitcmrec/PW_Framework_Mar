# Project Coding Rules (Non-Obvious Only)

- Preserve the page-object transition pattern: navigation methods return the next page object instead of exposing raw page flows in specs.
- Reuse `TestConfig` for app URL, credentials, and shared product constants; this repo does not use Playwright `baseURL`.
- New data-driven tests should keep fixture paths repo-relative like `testdata/data.json`, because current providers read from the filesystem directly.
- Assume tests are stateful unless proven otherwise; config forces single-worker execution.
- Follow the current selector style: prefer `getByRole` with exact accessible names; only fall back to CSS/XPath when roles are missing.
- Search actions are duplicated in `HomePage` and `MyAccount`; keep behavior aligned if you modify one.