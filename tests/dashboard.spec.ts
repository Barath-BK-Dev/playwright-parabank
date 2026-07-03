import { test, expect } from "../fixtures/baseFixture";
import { env } from "../config/env";

test("Validate account balances after login", async ({
  loginPage,
  dashboardPage,
  page,
}) => {
  await page.goto("/parabank/overview.htm");
  await page.waitForURL(/overview/);

  await dashboardPage.verifyDashboardLoaded();

  const balances = await dashboardPage.getAllBalances();

  expect(balances.length).toBeGreaterThan(0);

  const total = await dashboardPage.getTotalBalance();

  console.log("Total Balance:", total);

  expect(total).toBeGreaterThan(0); // basic validation
});
