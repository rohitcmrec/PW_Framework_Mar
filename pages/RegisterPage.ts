import { tr } from '@faker-js/faker';
import { Page, Locator, expect } from '@playwright/test'

export class RegisterPage {

    private readonly page: Page;
    private readonly firstName: Locator;
    private readonly lasttName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly subscribeYes: Locator;
    private readonly subscribeNo: Locator;
    private readonly policyCheckBox: Locator;
    private readonly continueBtn: Locator;
    private readonly confirmationMsg: Locator;
    private readonly confirmContinue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = this.page.getByRole('textbox', { name: '* First Name', exact: true })
        this.lasttName = this.page.getByRole('textbox', { name: '* Last Name', exact: true });
        this.email = this.page.getByRole('textbox', { name: '* E-Mail', exact: true })
        this.telephone = this.page.getByRole('textbox', { name: '* Telephone', exact: true })
        this.password = this.page.getByRole('textbox', { name: '* Password', exact: true })
        this.confirmPassword = this.page.getByRole('textbox', { name: '* Password Confirm', exact: true })
        this.subscribeYes = this.page.getByRole('radio', { name: 'Yes', exact: true })
        this.subscribeNo = this.page.getByRole('radio', { name: 'No', exact: true })
        this.policyCheckBox = this.page.locator('//input[@name="agree"]');
        this.continueBtn = this.page.getByRole('button', { name: 'Continue', exact: true })
        this.confirmationMsg = this.page.locator('h1:has-text("Your Account Has Been Created")');
        this.confirmContinue = this.page.getByRole('button', { name: 'Continue', exact: true })
    }

    async performRegistration(fName: string, lName: string, mail: string, tele: string, pwd: string, subs: string) {
        await this.firstName.fill(fName);
        await this.lasttName.fill(lName);
        await this.email.fill(mail);
        await this.telephone.fill(tele);
        await this.password.fill(pwd);
        await this.confirmPassword.fill(pwd);
        if (subs === 'Yes') {
            await this.subscribeYes.click()
        } else {
            await this.subscribeNo.click();
        }
        await this.policyCheckBox.setChecked(true);
        await this.continueBtn.click();
        return await this.confirmationMsg.innerText();

    }
}