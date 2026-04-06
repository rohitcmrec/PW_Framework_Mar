
import { TestConfig } from '../test.config'
import { SearchResultsPage } from '../pages/SearchResultsPage'
import { ProductPage } from '../pages/ProductPage'
import { test, expect } from '../fixtures/baseFixture'


let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;
let config: TestConfig;

test.beforeEach('Navigate to application', async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
})

test.afterEach('Close browser', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close()
})

test('Search for iMac and add to cart after login', { tag: ['@sanity', '@regression'] }, async ({ myAccount }) => {

    expect(await myAccount.titleHomePage()).toBe('My Account');

    // Step 4: Search for product
    searchResultsPage = await myAccount.searchProduct('imac');

    // Step 5: Verify search results page
    let searchTitle = await searchResultsPage.getPageTitle();
    expect(searchTitle).toContain('Search - imac');

    let searchUrl = await searchResultsPage.getPageUrl();
    expect(searchUrl).toContain('route=product/search');
    expect(searchUrl).toContain('search=imac');

    // Step 6: Verify product is displayed in search results
    let isProductDisplayed = await searchResultsPage.isProductDisplayed('iMac');
    expect(isProductDisplayed).toBeTruthy();

    // Step 7: Click on the product
    productPage = await searchResultsPage.clickProductByName('iMac');

    // Step 8: Verify product page
    let productTitle = await productPage.getPageTitle();
    expect(productTitle).toBe('iMac');

    let productUrl = await productPage.getPageUrl();
    expect(productUrl).toContain('route=product/product');
    expect(productUrl).toContain('product_id=41');

    // Step 9: Verify product details
    let productName = await productPage.getProductTitle();
    expect(productName).toBe('iMac');

    let productPrice = await productPage.getProductPrice();
    expect(productPrice).toContain('$122.00');

    // Step 10: Add product to cart
    await productPage.clickAddToCart();

    // Step 11: Verify success message
    let isSuccessVisible = await productPage.isSuccessMessageVisible();
    expect(isSuccessVisible).toBeTruthy();

    let successMessage = await productPage.getSuccessMessage();
    expect(successMessage).toContain('Success');
    expect(successMessage).toContain('iMac');
    expect(successMessage).toContain('shopping cart');
})
