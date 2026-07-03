import { test, expect } from "../fixtures/baseFixture";
import { env } from "../config/env";
import { TransferPage } from "../pages/TransferPage";

test("@Regression Transfer funds and validate balance", async ({
  // loginPage,
  dashboardPage,
  page,
}) => {
  const transferPage = new TransferPage(page);

  // Navigate to dashboard
  await page.goto("/parabank/overview.htm");
  await page.waitForURL(/overview/);

  // Get initial balance
  await dashboardPage.verifyDashboardLoaded();
  const beforeTotal = await dashboardPage.getTotalBalance();

  // Perform transfer
  await transferPage.goto();
  await transferPage.transfer("50");
  await transferPage.verifyTransferSuccess();

  // Go back to dashboard
  await page.click('a[href*="overview"]');

  // Get updated balance
  await dashboardPage.verifyDashboardLoaded();
  const afterTotal = await dashboardPage.getTotalBalance();

  console.log("Before:", beforeTotal);
  console.log("After:", afterTotal);

  // Validate logic (IMPORTANT)
  expect(afterTotal).toBe(beforeTotal);
});
