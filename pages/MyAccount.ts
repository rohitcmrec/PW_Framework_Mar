import { tr } from '@faker-js/faker';
import { Page, Locator } from '@playwright/test'
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { SearchResultsPage } from './SearchResultsPage';

export class MyAccount {

    private readonly page: Page;
    private readonly myAccountLink: Locator;
    private readonly logoutLink: Locator;
    private readonly continueBtn: Locator;
    private readonly searchBox: Locator;
    private readonly searchBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountLink = this.page.locator('span', { hasText: 'My Account' });
        this.logoutLink = this.page.getByRole('link', { name: 'Logout' });
        this.continueBtn = this.page.getByRole('button', { name: 'Continue', exact: true })
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
    async clickLogout() {
        try {
            await this.logoutLink.click()
            await this.continueBtn.click()
            return new HomePage(this.page);
        } catch (error) {
            console.log(`Exception occured while clicking $(error)`);
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

    async searchProduct(productName: string): Promise<SearchResultsPage> {
        try {
            await this.enterProductName(productName);
            await this.clickSearchBtn();
            return new SearchResultsPage(this.page);
        } catch (error) {
            console.log(`Exception occurred while searching for product: ${error}`);
            throw Error;
        }
    }
}