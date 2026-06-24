import { test, expect } from "../fixtures/baseFixture";
import { env } from "../config/env";

test("Login", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(env.username, env.password);
  console.log(process.env.USERNAME);
});

test("@smoke Login with Valid data", async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.loginAndExpectSuccess(env.username, env.password);
  await dashboardPage.verifyDashboardLoaded();
});

test("Login with Invalid User and Pass", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginAndExpectFailure("wrong", "wrong");
});
