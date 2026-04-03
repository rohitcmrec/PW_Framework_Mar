import { Page, Locator } from '@playwright/test'
import { RegisterPage } from './RegisterPage';
import { HomePage } from './HomePage';
import { MyAccount } from './MyAccount';
import { Logger } from '../utils/Logger';

export class LoginPage {

    private readonly page: Page;
    private readonly usernameBox: Locator;
    private readonly passwordBox: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly registerLink: Locator;
    private readonly PAGE_NAME = 'LoginPage';

    constructor(page: Page) {
        this.page = page;
        Logger.info(this.PAGE_NAME, 'Initializing LoginPage');
        
        this.usernameBox = this.page.getByRole('textbox', { name: 'E-Mail Address', exact: true });
        this.passwordBox = this.page.getByRole('textbox', { name: 'Password', exact: true });
        this.loginBtn = this.page.getByRole('button', { name: 'Login', exact: true });
        this.forgotPasswordLink = this.page.getByRole('link', { name: 'Forgotten Password', exact: true });
        this.registerLink = this.page.getByRole('link', { name: 'Register', exact: true });
        
        Logger.success(this.PAGE_NAME, 'LoginPage initialized successfully');
    }

    async titleLoginPage(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'titleLoginPage');
        try {
            const title = await this.page.title();
            Logger.success(this.PAGE_NAME, `Login page title: "${title}"`);
            Logger.methodExit(this.PAGE_NAME, 'titleLoginPage', title);
            return title;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get login page title', error);
            throw error;
        }
    }

    async urlLoginPage(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'urlLoginPage');
        try {
            const url = this.page.url();
            Logger.success(this.PAGE_NAME, `Login page URL: "${url}"`);
            Logger.methodExit(this.PAGE_NAME, 'urlLoginPage', url);
            return url;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get login page URL', error);
            throw error;
        }
    }

    async clickRegisterLink(): Promise<RegisterPage> {
        Logger.methodEntry(this.PAGE_NAME, 'clickRegisterLink');
        try {
            Logger.action(this.PAGE_NAME, 'Clicking', 'Register link');
            await this.registerLink.click();
            
            Logger.success(this.PAGE_NAME, 'Register link clicked successfully');
            Logger.info(this.PAGE_NAME, 'Navigating to RegisterPage');
            Logger.methodExit(this.PAGE_NAME, 'clickRegisterLink');
            
            return new RegisterPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click register link', error);
            throw error;
        }
    }

    async performLogin(uname: string, pword: string): Promise<MyAccount> {
        Logger.methodEntry(this.PAGE_NAME, 'performLogin', { username: uname, password: '***' });
        try {
            Logger.action(this.PAGE_NAME, 'Filling', `Username field with: "${uname}"`);
            await this.usernameBox.fill(uname);
            Logger.success(this.PAGE_NAME, 'Username filled successfully');
            
            Logger.action(this.PAGE_NAME, 'Filling', 'Password field (masked)');
            await this.passwordBox.fill(pword);
            Logger.success(this.PAGE_NAME, 'Password filled successfully');
            
            Logger.action(this.PAGE_NAME, 'Clicking', 'Login button');
            await this.loginBtn.click();
            Logger.success(this.PAGE_NAME, 'Login button clicked successfully');
            
            Logger.info(this.PAGE_NAME, 'Login performed, navigating to MyAccount page');
            Logger.methodExit(this.PAGE_NAME, 'performLogin');
            
            return new MyAccount(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Failed to perform login for user: ${uname}`, error);
            throw error;
        }
    }
}

// Made with Bob
