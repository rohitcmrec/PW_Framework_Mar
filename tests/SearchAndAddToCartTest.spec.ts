import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { TestConfig } from '../test.config'
import { MyAccount } from '../pages/MyAccount'
import { SearchResultsPage } from '../pages/SearchResultsPage'
import { ProductPage } from '../pages/ProductPage'

let loginPage: LoginPage;
let homePage: HomePage;
let myAccount: MyAccount;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;
let config: TestConfig;

test.beforeEach('Navigate to application', async ({ page }) => {
    config = new TestConfig();
    homePage = new HomePage(page);
    await page.goto(config.appUrl);
})

test.afterEach('Close browser', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close()
})

test('Search for iMac and add to cart after login', { tag: ['@sanity', '@regression'] }, async ({ page }) => {

    // Step 1: Navigate to login page
    await homePage.clickMyAccount();
    loginPage = await homePage.clickLogin();

    // Step 2: Verify login page
    let loginUrl = await loginPage.urlLoginPage();
    expect(loginUrl).toContain('route=account/login');

    let loginTitle = await loginPage.titleLoginPage();
    expect(loginTitle).toContain('Account Login');

    // Step 3: Perform login
    myAccount = await loginPage.performLogin(config.email, config.password);
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

test.only('Direct login and add iMac to cart - simplified', { tag: ['@sanity'] }, async ({ page }) => {

    // Navigate directly to login page
    await page.goto(config.appUrl + 'index.php?route=account/login');
    loginPage = new LoginPage(page);

    // Perform login
    await loginPage.performLogin(config.email, config.password);
    myAccount = new MyAccount(page);
    expect(await myAccount.titleHomePage()).toBe('My Account');

    // Search for iMac
    await myAccount.enterProductName('imac');
    await myAccount.clickSearchBtn();
    searchResultsPage = new SearchResultsPage(page);

    // Click on iMac product
    productPage = await searchResultsPage.clickProductByName('iMac');

    // Add to cart
    await productPage.clickAddToCart();

    // Verify success
    expect(await productPage.isSuccessMessageVisible()).toBeTruthy();
})

// Made with Bob
