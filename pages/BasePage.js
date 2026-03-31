// pages/BasePage.js
export class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     * @param {string} brand
     */
    constructor(page, brand = "ATF") {
        this.page = page;
        this.brand = brand;
    }

    /**
     * Constructs the URL based on the pattern: /dashboard/brand/{brand}/{section}
     * @param {string} pathSegment - e.g., 'media-airings' or 'media-spot'
     * @param {Object} params - e.g., { dateRange: 14, demographic: 'P18+' }
     */
    async navigateTo(pathSegment, params = { dateRange: 14 }) {
        const searchParams = new URLSearchParams(params).toString();
        const targetPath = `/dashboard/brand/${this.brand}/${pathSegment}?${searchParams}`;

        // Playwright uses the baseURL from config + this path
        await this.page.goto(targetPath);
    }
}
