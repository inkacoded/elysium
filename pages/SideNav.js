// pages/components/SideNav.js

export class SideNav {
    constructor(page) {
        this.page = page;

        this.homeButton = page.getByTestId("desktop-drawer").locator("a").filter({ hasText: "Home" });
        this.globalButton = page.getByTestId("desktop-drawer").getByText("Global");
        this.studioButton = page.getByTestId("desktop-drawer").getByText("Studio");
        this.insightsButton = page.getByTestId("desktop-drawer").getByText("Insights");

        this.overviewLink = page.getByRole("button", { name: "Media Measurement" });
        this.attentionAnalytics = page.getByRole("button", { name: "Attention Analytics" });
        this.contacts = page.getByRole("link", { name: "Contacts" });
        this.unifiedMeasurement = page.getByRole("button", { name: "Unified Measurement" });
        this.tvConversions = page.getByRole("button", { name: "TV Conversions" });
    }
    async openSettings() {
        await this.settingsLink.click();
    }
}
