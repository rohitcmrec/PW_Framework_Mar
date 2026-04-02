import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { TestConfig } from '../test.config'
import { MyAccount } from '../pages/MyAccount';


let loginPage: LoginPage;
let homePage: HomePage;
let myAccount: MyAccount
let config: TestConfig;

test.beforeEach('', async ({ page }) => {
    config = new TestConfig();
    homePage = new HomePage(page);
    await page.goto(config.appUrl);
})

test.afterEach('', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close()
})

test('test successful login page', { tag: ['@sanity', '@master'] }, async () => {

    await homePage.clickMyAccount()
    loginPage = await homePage.clickLogin();

    let url = await loginPage.urlLoginPage();
    expect(url).toContain('route=account/login')

    let title = await loginPage.titleLoginPage();
    expect(title).toContain('Account Login');

    myAccount = await loginPage.performLogin(config.email, config.password);
    expect(await myAccount.titleHomePage()).toBe('My Account')
})