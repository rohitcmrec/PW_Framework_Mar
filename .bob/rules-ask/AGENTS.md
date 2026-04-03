# Project Documentation Rules (Non-Obvious Only)

- `test.config.ts` is the real runtime source for URL, credentials, and product expectations; this is not encoded in Playwright config.
- The project has custom tag scripts but no generic `test`, `lint`, or `build` scripts in `package.json`.
- `reports/` is the configured HTML report output, not just an incidental artifact folder.
- `pages/ProductPage.ts` is currently empty; search/product behavior lives in `HomePage` and `MyAccount`.
- Registration coverage is partly generated from JSON data via `DataProvider`, so some tests do not appear as static one-off cases.