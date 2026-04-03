import { Page, Locator } from '@playwright/test'
import { Logger } from '../utils/Logger';

export class ProductPage {

    private readonly page: Page;
    private readonly productTitle: Locator;
    private readonly productPrice: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartBtn: Locator;
    private readonly successMessage: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly PAGE_NAME = 'ProductPage';

    constructor(page: Page) {
        this.page = page;
        Logger.info(this.PAGE_NAME, 'Initializing ProductPage');
        
        this.productTitle = this.page.locator('h1');
        this.productPrice = this.page.locator('h2').last();
        this.quantityInput = this.page.getByRole('textbox', { name: 'Qty' });
        this.addToCartBtn = this.page.getByRole('button', { name: 'Add to Cart', exact: true });
        this.successMessage = this.page.locator('div.alert.alert-success, div:has-text("Success: You have added")').first();
        this.shoppingCartLink = this.page.getByRole('link', { name: 'shopping cart' });
        
        Logger.success(this.PAGE_NAME, 'ProductPage initialized successfully');
    }

    async getProductTitle(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'getProductTitle');
        try {
            const title = await this.productTitle.textContent() || '';
            Logger.success(this.PAGE_NAME, `Product title retrieved: "${title}"`);
            Logger.methodExit(this.PAGE_NAME, 'getProductTitle', title);
            return title;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get product title', error);
            throw error;
        }
    }

    async getProductPrice(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'getProductPrice');
        try {
            const price = await this.productPrice.textContent() || '';
            Logger.success(this.PAGE_NAME, `Product price retrieved: "${price}"`);
            Logger.methodExit(this.PAGE_NAME, 'getProductPrice', price);
            return price;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get product price', error);
            throw error;
        }
    }

    async setQuantity(quantity: string) {
        Logger.methodEntry(this.PAGE_NAME, 'setQuantity', { quantity });
        try {
            Logger.action(this.PAGE_NAME, 'Clearing', 'Quantity input field');
            await this.quantityInput.clear();
            
            Logger.action(this.PAGE_NAME, 'Filling', `Quantity input with value: ${quantity}`);
            await this.quantityInput.fill(quantity);
            
            Logger.success(this.PAGE_NAME, `Quantity set to: ${quantity}`);
            Logger.methodExit(this.PAGE_NAME, 'setQuantity');
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Failed to set quantity to ${quantity}`, error);
            throw error;
        }
    }

    async clickAddToCart() {
        Logger.methodEntry(this.PAGE_NAME, 'clickAddToCart');
        try {
            Logger.action(this.PAGE_NAME, 'Clicking', 'Add to Cart button');
            await this.addToCartBtn.click();
            Logger.success(this.PAGE_NAME, 'Add to Cart button clicked successfully');
            Logger.methodExit(this.PAGE_NAME, 'clickAddToCart');
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click Add to Cart button', error);
            throw error;
        }
    }

    async getSuccessMessage(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'getSuccessMessage');
        try {
            Logger.debug(this.PAGE_NAME, 'Waiting for success message to be visible (timeout: 5s)');
            await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
            
            const message = await this.successMessage.textContent() || '';
            Logger.success(this.PAGE_NAME, `Success message retrieved: "${message}"`);
            Logger.methodExit(this.PAGE_NAME, 'getSuccessMessage', message);
            return message;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get success message', error);
            return '';
        }
    }

    async isSuccessMessageVisible(): Promise<boolean> {
        Logger.methodEntry(this.PAGE_NAME, 'isSuccessMessageVisible');
        try {
            Logger.debug(this.PAGE_NAME, 'Waiting for success message with selector: div.alert.alert-success (timeout: 10s)');
            await this.page.waitForSelector('div.alert.alert-success', { state: 'visible', timeout: 10000 });
            Logger.success(this.PAGE_NAME, 'Success message is visible');
            Logger.methodExit(this.PAGE_NAME, 'isSuccessMessageVisible', true);
            return true;
        } catch (error) {
            Logger.warn(this.PAGE_NAME, 'Primary success message selector not found, trying alternative');
            try {
                Logger.debug(this.PAGE_NAME, 'Checking for "Success" text anywhere on page (timeout: 5s)');
                const successText = await this.page.locator('text=Success').first();
                const isVisible = await successText.isVisible({ timeout: 5000 });
                
                if (isVisible) {
                    Logger.success(this.PAGE_NAME, 'Success text found on page');
                } else {
                    Logger.warn(this.PAGE_NAME, 'Success message not visible');
                }
                Logger.methodExit(this.PAGE_NAME, 'isSuccessMessageVisible', isVisible);
                return isVisible;
            } catch (altError) {
                Logger.error(this.PAGE_NAME, 'Success message not found with any selector', altError);
                Logger.methodExit(this.PAGE_NAME, 'isSuccessMessageVisible', false);
                return false;
            }
        }
    }

    async clickShoppingCartLink() {
        Logger.methodEntry(this.PAGE_NAME, 'clickShoppingCartLink');
        try {
            Logger.action(this.PAGE_NAME, 'Clicking', 'Shopping cart link');
            await this.shoppingCartLink.click();
            Logger.success(this.PAGE_NAME, 'Shopping cart link clicked successfully');
            Logger.methodExit(this.PAGE_NAME, 'clickShoppingCartLink');
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to click shopping cart link', error);
            throw error;
        }
    }

    async getPageTitle(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'getPageTitle');
        try {
            const title = await this.page.title();
            Logger.success(this.PAGE_NAME, `Page title: "${title}"`);
            Logger.methodExit(this.PAGE_NAME, 'getPageTitle', title);
            return title;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get page title', error);
            throw error;
        }
    }

    async getPageUrl(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'getPageUrl');
        try {
            const url = this.page.url();
            Logger.success(this.PAGE_NAME, `Page URL: "${url}"`);
            Logger.methodExit(this.PAGE_NAME, 'getPageUrl', url);
            return url;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get page URL', error);
            throw error;
        }
    }
}

// Made with Bob
