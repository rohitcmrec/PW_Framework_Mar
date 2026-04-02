import { tr } from '@faker-js/faker';
import { Page, Locator } from '@playwright/test'
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';

export class HomePage {

    private readonly page: Page;
    private readonly myAccountLink: Locator;
    private readonly loginLink: Locator;
    private readonly registerLink: Locator;
    private readonly searchBox: Locator;
    private readonly searchBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountLink = this.page.locator('span', { hasText: 'My Account' });
        this.loginLink = this.page.getByRole('link', { name: 'Login' });
        this.registerLink = this.page.getByRole('link', { name: 'Register', exact: true });
        this.searchBox = this.page.getByRole('textbox', { name: 'Search', exact: true })
        this.searchBtn = this.page.locator('#search button');
    }
    async titleHomePage(): Promise<string> {
        return await this.page.title();
    }
    async urlHomePage() {
        return this.page.url();
    }
    async clickMyAccount() {
        try {
            await this.myAccountLink.click();
        } catch (error) {
            console.log(`Exception occured while clicking:$(error)`)
            throw Error;
        }
    }
    async clickLogin() {
        try {
            await this.loginLink.click()
            return new LoginPage(this.page);
        } catch (error) {
            console.log(`Exception occured while clicking $(error)`);
            throw Error;
        }
    }
    async clickRegister() {
        try {
            await this.registerLink.click();
            return new RegisterPage(this.page);
        } catch (error) {
            console.log(`Exception $(error) while clikcing Register link`);
            throw Error;
        }
    }

    async enterProductName(name: string) {
        try {
            await this.searchBox.fill(name);
        } catch (error) {
            console.log(`Exception occured while entering product name in search bar`);

        }
    }

    async clickSearchBtn() {
        try {
            await this.searchBtn.click();
        } catch (error) {
            console.log(`Exception occured while clicking on search button`);
            throw Error;
        }
    }
}