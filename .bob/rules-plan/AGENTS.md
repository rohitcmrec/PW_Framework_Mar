# Project Architecture Rules (Non-Obvious Only)

- The suite couples tests to shared config and likely shared account state; serialized execution in `playwright.config.ts` is an architectural constraint, not a temporary default.
- Navigation logic is embedded in page objects and modeled as returned page-object transitions; specs are intentionally thin wrappers over those flows.
- Runtime test generation from `testdata/data.json` means planning changes to registration coverage must include data-file changes, not only spec edits.
- Search behavior is duplicated across `HomePage` and `MyAccount`, indicating cross-page capability without a dedicated product page abstraction yet.
- Reporting is dual-channel by design: HTML for local inspection and Allure for richer results output.