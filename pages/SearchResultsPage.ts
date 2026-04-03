import { Page, Locator } from '@playwright/test'
import { ProductPage } from './ProductPage';
import { Logger } from '../utils/Logger';

export class SearchResultsPage {

    private readonly page: Page;
    private readonly searchResultsHeading: Locator;
    private readonly productLinks: Locator;
    private readonly addToCartButtons: Locator;
    private readonly PAGE_NAME = 'SearchResultsPage';

    constructor(page: Page) {
        this.page = page;
        Logger.info(this.PAGE_NAME, 'Initializing SearchResultsPage');
        
        this.searchResultsHeading = this.page.locator('h1');
        this.productLinks = this.page.locator('h4 a');
        this.addToCartButtons = this.page.getByRole('button', { name: 'Add to Cart' });
        
        Logger.success(this.PAGE_NAME, 'SearchResultsPage initialized successfully');
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

    async getSearchResultsHeading(): Promise<string> {
        Logger.methodEntry(this.PAGE_NAME, 'getSearchResultsHeading');
        try {
            const heading = await this.searchResultsHeading.textContent() || '';
            Logger.success(this.PAGE_NAME, `Search results heading: "${heading}"`);
            Logger.methodExit(this.PAGE_NAME, 'getSearchResultsHeading', heading);
            return heading;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get search results heading', error);
            throw error;
        }
    }

    async clickProductByName(productName: string): Promise<ProductPage> {
        Logger.methodEntry(this.PAGE_NAME, 'clickProductByName', { productName });
        try {
            Logger.action(this.PAGE_NAME, 'Clicking', `Product link: "${productName}"`);
            await this.page.locator('h4').getByRole('link', { name: productName }).click();
            
            Logger.success(this.PAGE_NAME, `Product "${productName}" clicked successfully`);
            Logger.info(this.PAGE_NAME, 'Navigating to ProductPage');
            Logger.methodExit(this.PAGE_NAME, 'clickProductByName');
            
            return new ProductPage(this.page);
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Failed to click product "${productName}"`, error);
            throw error;
        }
    }

    async getProductCount(): Promise<number> {
        Logger.methodEntry(this.PAGE_NAME, 'getProductCount');
        try {
            const count = await this.productLinks.count();
            Logger.success(this.PAGE_NAME, `Product count: ${count}`);
            Logger.methodExit(this.PAGE_NAME, 'getProductCount', count);
            return count;
        } catch (error) {
            Logger.error(this.PAGE_NAME, 'Failed to get product count', error);
            throw error;
        }
    }

    async isProductDisplayed(productName: string): Promise<boolean> {
        Logger.methodEntry(this.PAGE_NAME, 'isProductDisplayed', { productName });
        try {
            Logger.verify(this.PAGE_NAME, `Checking if product "${productName}" is displayed`);
            const product = this.page.locator('h4').getByRole('link', { name: productName });
            const isVisible = await product.isVisible();
            
            if (isVisible) {
                Logger.success(this.PAGE_NAME, `Product "${productName}" is displayed`);
            } else {
                Logger.warn(this.PAGE_NAME, `Product "${productName}" is NOT displayed`);
            }
            
            Logger.methodExit(this.PAGE_NAME, 'isProductDisplayed', isVisible);
            return isVisible;
        } catch (error) {
            Logger.error(this.PAGE_NAME, `Error checking if product "${productName}" is displayed`, error);
            return false;
        }
    }
}

// Made with Bob
