import { Page, Locator } from '@playwright/test'

export class ProductPage {

    private readonly page: Page;
    private readonly productTitle: Locator;
    private readonly productPrice: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartBtn: Locator;
    private readonly successMessage: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = this.page.locator('h1');
        this.productPrice = this.page.locator('h2').last();
        this.quantityInput = this.page.getByRole('textbox', { name: 'Qty' });
        this.addToCartBtn = this.page.getByRole('button', { name: 'Add to Cart', exact: true });
        // Success message appears in a div with class 'alert alert-success alert-dismissible'
        this.successMessage = this.page.locator('div.alert.alert-success, div:has-text("Success: You have added")').first();
        this.shoppingCartLink = this.page.getByRole('link', { name: 'shopping cart' });
    }

    async getProductTitle(): Promise<string> {
        return await this.productTitle.textContent() || '';
    }

    async getProductPrice(): Promise<string> {
        return await this.productPrice.textContent() || '';
    }

    async setQuantity(quantity: string) {
        try {
            await this.quantityInput.clear();
            await this.quantityInput.fill(quantity);
        } catch (error) {
            console.log(`Exception occurred while setting quantity: ${error}`);
            throw Error;
        }
    }

    async clickAddToCart() {
        try {
            await this.addToCartBtn.click();
        } catch (error) {
            console.log(`Exception occurred while clicking Add to Cart: ${error}`);
            throw Error;
        }
    }

    async getSuccessMessage(): Promise<string> {
        try {
            await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
            return await this.successMessage.textContent() || '';
        } catch (error) {
            console.log(`Exception occurred while getting success message: ${error}`);
            return '';
        }
    }

    async isSuccessMessageVisible(): Promise<boolean> {
        try {
            // Wait for the success message to appear
            await this.page.waitForSelector('div.alert.alert-success', { state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            // Alternative: check if "Success" text appears anywhere on the page
            try {
                const successText = await this.page.locator('text=Success').first();
                return await successText.isVisible({ timeout: 5000 });
            } catch {
                return false;
            }
        }
    }

    async clickShoppingCartLink() {
        try {
            await this.shoppingCartLink.click();
        } catch (error) {
            console.log(`Exception occurred while clicking shopping cart link: ${error}`);
            throw Error;
        }
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getPageUrl(): Promise<string> {
        return this.page.url();
    }
}

// Made with Bob
