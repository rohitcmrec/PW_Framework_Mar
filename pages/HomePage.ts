import { Page, Locator } from '@playwright/test'
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { Logger } from '../utils/Logger';

export class HomePage {

    private readonly page: Page;
    private readonly myAccountLink: Locator;
    private readonly loginLink: Locator;
    private readonly registerLink: Locator;
    private readonly searchBox: Locator;
    private readonly searchBtn: Locator;
    private readonly PAGE_NAME = 'HomePage';

    constructor(page: Page) {
        this.page = page;
        Logger.info(this.PAGE_NAME, 'Initializing HomePage');
        
        this.myAccountLink = this.page.locator('span', { hasText: 'My Account' });
        this.loginLink = this.page.getByRole('link', { name: 'Login' });
        this.registerLink = this.page.getByRole('link', { name: 'Register', exact: true });
        this.searchBox = this.page.getByRole('textbox', { name: 'Search', exact: true });
        this.searchBtn = this.page.locator('#search button');
        
        Logger.success(this.PAGE_NAME, 'HomePage initialized successfully');
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

    async clickLogin(): Promise<LoginPage> {
        Logger.methodEntry(this.PAGE_NAME, 'clickLogin');
        try {
            Logger.action(this.PAGE_NAME, 'Clicking', 'Login link');
            await this.loginLink.click();
            
            Logger.success(this.PAGE_NAME, 'Login link clicked successfully');
            Logger.info(this.PAGE_NAME, 'Navigating to LoginPage');
            Logger.methodExit(this.PAGE_NAME, 'clickLogin');
            
            return new LoginPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click Login link', error);
            throw error;
        }
    }

    async clickRegister(): Promise<RegisterPage> {
        Logger.methodEntry(this.PAGE_NAME, 'clickRegister');
        try {
            Logger.action(this.PAGE_NAME, 'Clicking', 'Register link');
            await this.registerLink.click();
            
            Logger.success(this.PAGE_NAME, 'Register link clicked successfully');
            Logger.info(this.PAGE_NAME, 'Navigating to RegisterPage');
            Logger.methodExit(this.PAGE_NAME, 'clickRegister');
            
            return new RegisterPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click Register link', error);
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
}

// Made with Bob
