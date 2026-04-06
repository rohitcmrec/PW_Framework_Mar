import { test as base, expect } from '@playwright/test'
import { MyAccount } from '../pages/MyAccount';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';

let config: TestConfig = new TestConfig();

type MyFixture = {
    myAccount: MyAccount
}

export const test = base.extend<MyFixture>({
    myAccount: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        const loginPage = await homePage.clickLogin();
        const myAccount = await loginPage.performLogin(config.email, config.password);
        await use(myAccount)
    }
});


export { expect };

