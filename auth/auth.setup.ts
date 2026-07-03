import { test as setup } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { env } from "../config/env";

setup("authenticate", async ({ page }) => {
  // Navigate to login page
  await page.goto("/");

  // Perform login
  const loginPage = new LoginPage(page);
  await loginPage.login(env.username, env.password);
  await page.waitForURL(/overview/);

  // Save storage state
  await page.context().storageState({ path: "auth.json" });
});
