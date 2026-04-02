import { Page, Locator } from '@playwright/test'
import { RegisterPage } from './RegisterPage';
import { HomePage } from './HomePage';
import { MyAccount } from './MyAccount';

export class LoginPage {

    private readonly page: Page;
    private readonly usernameBox: Locator;
    private readonly passwordBox: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly registerLink: Locator

    constructor(page: Page) {
        this.page = page;
        this.usernameBox = this.page.getByRole('textbox', { name: 'E-Mail Address', exact: true });
        this.passwordBox = this.page.getByRole('textbox', { name: 'Password', exact: true })
        this.loginBtn = this.page.getByRole('button', { name: 'Login', exact: true })
        this.forgotPasswordLink = this.page.getByRole('link', { name: 'Forgotten Password', exact: true })
        this.registerLink = this.page.getByRole('link', { name: 'Register', exact: true })
    }

    async titleLoginPage() {
        return await this.page.title();
    }

    async urlLoginPage() {
        return this.page.url();
    }

    async clickRegisterLink() {
        try {
            await this.registerLink.click();
            return new RegisterPage(this.page);
        } catch (error) {
            throw Error;
        }
    }

    async performLogin(uname: string, pword: string) {
        await this.usernameBox.fill(uname);
        await this.passwordBox.fill(pword);
        await this.loginBtn.click();
        return new MyAccount(this.page);
    }
}