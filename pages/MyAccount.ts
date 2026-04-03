import { Page, Locator } from '@playwright/test'
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { SearchResultsPage } from './SearchResultsPage';
import { Logger } from '../utils/Logger';

export class MyAccount {

    private readonly page: Page;
    private readonly myAccountLink: Locator;
    private readonly logoutLink: Locator;
    private readonly continueBtn: Locator;
    private readonly searchBox: Locator;
    private readonly searchBtn: Locator;
    private readonly PAGE_NAME = 'MyAccount';

    constructor(page: Page) {
        this.page = page;
        Logger.info(this.PAGE_NAME, 'Initializing MyAccount page');
        
        this.myAccountLink = this.page.locator('span', { hasText: 'My Account' });
        this.logoutLink = this.page.getByRole('link', { name: 'Logout' });
        this.continueBtn = this.page.getByRole('button', { name: 'Continue', exact: true });
        this.searchBox = this.page.getByRole('textbox', { name: 'Search', exact: true });
        this.searchBtn = this.page.locator('#search button');
        
        Logger.success(this.PAGE_NAME, 'MyAccount page initialized successfully');
    }

    async titleHomePage(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'titleHomePage');
        try {
            const title = await this.page.title();
            Logger.success(this.PAGE_NAME, `Page title: "${title}"`);
            Logger.methodExit(this.PAGE_NAME, 'titleHomePage', title);
            return title;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get page title', error);
            throw error;
        }
    }

    async urlHomePage(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'urlHomePage');
        try {
            const url = this.page.url();
            Logger.success(this.PAGE_NAME, `Page URL: "${url}"`);
            Logger.methodExit(this.PAGE_NAME, 'urlHomePage', url);
            return url;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get page URL', error);
            throw error;
        }
    }

    async clickMyAccount() {
        Logger.methodEntry(this.PAGE_NAME, 'clickMyAccount');
        try {
            Logger.action(this.PAGE_NAME, 'Clicking', 'My Account link');
            await this.myAccountLink.click();
            Logger.success(this.PAGE_NAME, 'My Account link clicked successfully');
            Logger.methodExit(this.PAGE_NAME, 'clickMyAccount');
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click My Account link', error);
            throw error;
        }
    }

    async clickLogout(): Promise<HomePage> {
        Logger.methodEntry(this.PAGE_NAME, 'clickLogout');
        try {
            Logger.action(this.PAGE_NAME, 'Clicking', 'Logout link');
            await this.logoutLink.click();
            Logger.success(this.PAGE_NAME, 'Logout link clicked successfully');
            
            Logger.action(this.PAGE_NAME, 'Clicking', 'Continue button after logout');
            await this.continueBtn.click();
            Logger.success(this.PAGE_NAME, 'Continue button clicked successfully');
            
            Logger.info(this.PAGE_NAME, 'Logout completed, navigating to HomePage');
            Logger.methodExit(this.PAGE_NAME, 'clickLogout');
            
            return new HomePage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to perform logout', error);
            throw error;
        }
    }

    async enterProductName(name: string) {
        Logger.methodEntry(this.PAGE_NAME, 'enterProductName', { productName: name });
        try {
            Logger.action(this.PAGE_NAME, 'Filling', `Search box with: "${name}"`);
            await this.searchBox.fill(name);
            Logger.success(this.PAGE_NAME, `Product name "${name}" entered successfully`);
            Logger.methodExit(this.PAGE_NAME, 'enterProductName');
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Failed to enter product name: "${name}"`, error);
            throw error;
        }
    }

    async clickSearchBtn() {
        Logger.methodEntry(this.PAGE_NAME, 'clickSearchBtn');
        try {
            Logger.action(this.PAGE_NAME, 'Clicking', 'Search button');
            await this.searchBtn.click();
            Logger.success(this.PAGE_NAME, 'Search button clicked successfully');
            Logger.methodExit(this.PAGE_NAME, 'clickSearchBtn');
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click search button', error);
            throw error;
        }
    }

    async searchProduct(productName: string): Promise<SearchResultsPage> {
        Logger.methodEntry(this.PAGE_NAME, 'searchProduct', { productName });
        try {
            Logger.info(this.PAGE_NAME, `Searching for product: "${productName}"`);
            
            await this.enterProductName(productName);
            await this.clickSearchBtn();
            
            Logger.success(this.PAGE_NAME, `Product search for "${productName}" completed`);
            Logger.info(this.PAGE_NAME, 'Navigating to SearchResultsPage');
            Logger.methodExit(this.PAGE_NAME, 'searchProduct');
            
            return new SearchResultsPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Failed to search for product: "${productName}"`, error);
            throw error;
        }
    }
}

// Made with Bob
