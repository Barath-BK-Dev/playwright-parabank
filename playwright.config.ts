import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

dotenv.config({
  path: `.env.${process.env.TEST_ENV || "qa"}`,
});
export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  fullyParallel: true,

  retries: 0,
  workers: 10,

  reporter: [["html"], ["list"]],

  projects: [
    {
      name: "setup auth",
      testDir: "./auth",
      testMatch: /auth\.setup\.ts/,
      use: {
        baseURL: process.env.BASE_URL!,
        browserName: "chromium",
        headless: true,
      },
    },
    {
      name: "chromium",
      use: {
        baseURL: process.env.BASE_URL!,
        browserName: "chromium",
        headless: true,
        screenshot: "on",
        trace: "on",
        storageState: "auth.json",
      },
      dependencies: ["setup auth"],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
