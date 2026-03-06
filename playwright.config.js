import { defineConfig, devices } from "@playwright/test";
/*
To run against QA: npx playwright test (since we set QA as default)
To run against Staging: ENV=stage npx playwright test
To run against Production: ENV=prod npx playwright test
*/
const ENV_URLS = {
    // prod: "https://login.ispot.tv/?callback=https://elysium.ispot.tv",
    // stage: "https://login-stage.ispot.tv/?callback=https://elysium.dev.ispot.tv",
    qa: "https://elysium.dev.ispot.tv",
};

// Determine environment from an Environment Variable (e.g., ENV=stage)
const environment = process.env.ENV || "qa";

export default defineConfig({
    testDir: "./tests",
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        // Dynamically pick the URL based on the ENV variable
        baseURL: ENV_URLS[environment],
        // Add this line! This tells Playwright to load cookies/localStorage from this file
        storageState: "playwright/.auth/user.json",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },

    /* Configure projects for major browsers */
    projects: [
        // 1. Setup project
        {
            name: "setup",
            testMatch: /auth\.setup\.js/,
        },
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
            dependencies: ["setup"], // Forces setup to run first
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
            dependencies: ["setup"],
        },

        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
            dependencies: ["setup"],
        },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
