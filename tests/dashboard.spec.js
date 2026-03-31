// tests/dashboard.spec.js
import { test, expect } from "@playwright/test";
import { AiringsPage } from "../pages/MediaMesurement/Airings.js"; // Note: Must include .js extension in ESM

test.describe("Elysium Dashboard Navigation", () => {
    test("should navigate to Media Airings via URL construction", async ({ page }) => {
        const mediaPage = new AiringsPage(page, "ATF");

        // Executing the goto() which uses the ESM class logic
        await mediaPage.goto();

        // Verify the URL structure:
        // Domain comes from playwright.config.js
        // Path and Query come from the POM
        await expect(page).toHaveURL(/\/dashboard\/brand\/ATF\/media-airings/);
        await expect(page).toHaveURL(/dateRange=14/);
    });

    test("should handle demographic query parameters", async ({ page }) => {
        const mediaPage = new AiringsPage(page, "ATF");

        // Demonstrating the flexibility of the navigateTo helper
        await mediaPage.applyDemographic("P18+");

        // Note: Playwright/Browsers auto-encode '+' to '%2B' in the URL
        await expect(page).toHaveURL(/demographic=P18%2B/);
    });
});
