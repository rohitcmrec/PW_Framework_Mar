import { Page, Locator } from '@playwright/test'
import { ProductPage } from './ProductPage';

export class SearchResultsPage {

    private readonly page: Page;
    private readonly searchResultsHeading: Locator;
    private readonly productLinks: Locator;
    private readonly addToCartButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchResultsHeading = this.page.locator('h1');
        this.productLinks = this.page.locator('h4 a');
        this.addToCartButtons = this.page.getByRole('button', { name: 'Add to Cart' });
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getPageUrl(): Promise<string> {
        return this.page.url();
    }

    async getSearchResultsHeading(): Promise<string> {
        return await this.searchResultsHeading.textContent() || '';
    }

    async clickProductByName(productName: string): Promise<ProductPage> {
        try {
            await this.page.locator('h4').getByRole('link', { name: productName }).click();
            return new ProductPage(this.page);
        } catch (error) {
            console.log(`Exception occurred while clicking product: ${error}`);
            throw Error;
        }
    }

    async getProductCount(): Promise<number> {
        return await this.productLinks.count();
    }

    async isProductDisplayed(productName: string): Promise<boolean> {
        try {
            const product = this.page.locator('h4').getByRole('link', { name: productName });
            return await product.isVisible();
        } catch (error) {
            return false;
        }
    }
}

// Made with Bob
