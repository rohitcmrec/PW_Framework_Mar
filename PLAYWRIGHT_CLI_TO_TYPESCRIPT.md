# Playwright CLI to TypeScript Code Conversion

This document shows the TypeScript Playwright code generated from the playwright-cli commands used to login, search for iMac, and add it to cart.

## Original Playwright CLI Commands

```bash
# 1. Open browser and navigate to login page
playwright-cli open https://naveenautomationlabs.com/opencart/index.php?route=account/login

# 2. Fill email field
playwright-cli fill e92 "rohit1@ibm.com"

# 3. Fill password field
playwright-cli fill e95 "1234"

# 4. Click login button
playwright-cli click e97

# 5. Fill search box with "imac"
playwright-cli fill e37 "imac"

# 6. Click search button
playwright-cli click e39

# 7. Click on iMac product link
playwright-cli click e116

# 8. Click Add to Cart button
playwright-cli click e116
```

## Generated TypeScript Code

### Raw Playwright Code (from CLI output)

```typescript
// Navigate to login page
await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

// Fill email
await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('rohit1@ibm.com');

// Fill password
await page.getByRole('textbox', { name: 'Password' }).fill('1234');

// Click login button
await page.getByRole('button', { name: 'Login' }).click();

// Fill search box
await page.getByRole('textbox', { name: 'Search' }).fill('imac');

// Click search button
await page.getByRole('button').filter({ hasText: /^$/ }).click();

// Click on iMac product
await page.locator('h4').getByRole('link', { name: 'iMac' }).click();

// Click Add to Cart
await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
```

## Framework Integration

The above code has been integrated into your existing Page Object Model framework:

### 1. **ProductPage.ts** (New)
- Handles product page interactions
- Methods: `clickAddToCart()`, `setQuantity()`, `getSuccessMessage()`, etc.

### 2. **SearchResultsPage.ts** (New)
- Handles search results page
- Methods: `clickProductByName()`, `isProductDisplayed()`, etc.

### 3. **MyAccount.ts** (Updated)
- Added `searchProduct()` method that returns `SearchResultsPage`

### 4. **SearchAndAddToCartTest.spec.ts** (New Test File)
- Complete test demonstrating the full flow
- Two test cases:
  1. Full flow with all verifications
  2. Simplified direct flow

## Running the Tests

```bash
# Run the new test file
npx playwright test tests/SearchAndAddToCartTest.spec.ts

# Run specific test
npx playwright test tests/SearchAndAddToCartTest.spec.ts -g "Search for iMac and add to cart"

# Run with tags
npm run test:sanity
npm run test:regression
```

## Key Features

1. **Page Object Pattern**: All interactions are encapsulated in page objects
2. **Type Safety**: Full TypeScript support with proper typing
3. **Reusability**: Methods can be reused across multiple tests
4. **Maintainability**: Changes to UI only require updates in page objects
5. **Assertions**: Comprehensive assertions at each step
6. **Error Handling**: Try-catch blocks with meaningful error messages

## Test Flow

```
HomePage → LoginPage → MyAccount → SearchResultsPage → ProductPage
   ↓           ↓            ↓              ↓                ↓
Navigate → Login → Search Product → Select Product → Add to Cart
```

## Locator Strategy

Following your framework's pattern, the code uses:
- `getByRole()` for accessibility-first selection (preferred)
- `locator()` for specific CSS selectors when needed
- `exact: true` for precise matching

All locators align with your existing framework standards.