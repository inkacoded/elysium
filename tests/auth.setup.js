// tests/auth.setup.js
import { test as setup, expect } from "@playwright/test";
import "dotenv/config"; // Loads variables from .env into process.env

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page, baseURL }) => {
    // baseURL will automatically be 'https://login-qa.ispot.tv/?callback=https://elysium.dev.ispot.tv
    // if that's what the config set.
    const email = process.env.ADMIN_EMAIL; // Pull from .env
    const password = process.env.ADMIN_PASSWORD; // Pull from .env

    await page.goto(baseURL);

    // 2. Perform login actions
    await page.getByRole("textbox", { name: "Email Address" }).fill(email);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByTestId("action_login_as_3060").click();
    // 3. Wait for the page to redirect to the dashboard
    await expect(page).toHaveURL(/.*dashboard/);

    // 4. Save storage state (cookies, localStorage) to a file
    await page.context().storageState({ path: authFile });
});
