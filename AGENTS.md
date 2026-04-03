# AGENTS.md

This file provides guidance to agents when working with code in this repository.

- There is no build/lint script; useful entry points are the custom tag scripts in `package.json` and direct Playwright CLI.
- Single spec: `npx playwright test tests/LoginPageTest.spec.ts`
- Single test title: `npx playwright test tests/RegisterPageTest.spec.ts -g "Userregistration page via faker library"`
- Tagged suites are custom and project-specific: `npm run test:master`, `npm run test:sanity`, `npm run test:regression`, `npm run test:datadriven`, `npm run test:data`.
- HTML reports are written to `reports/`; Allure is also enabled in `playwright.config.ts`.
- Execution is intentionally serialized (`workers: 1`, `fullyParallel: false`); do not assume new tests are parallel-safe.
- Base URL is not configured in Playwright `use`; tests read `appUrl` from `test.config.ts` and call `page.goto(...)` manually in `beforeEach`.
- `test.config.ts` also holds real credentials and product assertions; changing it affects multiple specs.
- Page objects are navigation-oriented: methods such as `clickLogin()`, `clickRegister()`, `performLogin()`, and `clickLogout()` return the next page object and tests rely on that chaining pattern.
- Registration data-driven tests are generated at module load by reading `testdata/data.json` through `DataProvider.getDataFromJson()`. Keep testdata paths relative to the repo root.
- `DataProvider.getDataFromCSV()` returns the parser result directly and is not used by current specs; verify behavior before adopting it.
- Locators are mostly `getByRole(..., { exact: true })`; keep selectors aligned with the existing accessibility-first style unless the page forces otherwise.
- `pages/ProductPage.ts` exists but is empty; product-search coverage is currently spread across `HomePage` and `MyAccount` methods instead of a dedicated page object.