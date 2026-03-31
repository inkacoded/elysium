// pages/AiringsPage.js
import { BasePage } from "../BasePage.js";

export class AiringsPage extends BasePage {
    constructor(page, brand) {
        super(page, brand);

        // Locators specific to this view
        this.resultsGrid = page.locator(".airings-results-grid");
        this.exportButton = page.locator('button:has-text("Export")');
    }

    async goto() {
        // Navigates specifically to the airings path
        await this.navigateTo("media-airings");
    }

    async applyDemographic(demo) {
        // Navigates while overriding/adding parameters
        await this.navigateTo("media-airings", { dateRange: 14, demographic: demo });
    }
}
