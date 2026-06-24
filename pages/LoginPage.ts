import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  private username = this.page.locator('input[name="username"]');
  private password = this.page.locator('input[name="password"]');
  private loginBtn = this.page.locator('input[value="Log In"]');
  private errorMsg = this.page.locator(".error");

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState();
  }

  async loginAndExpectSuccess(username: string, password: string) {
    await this.login(username, password);
    await expect(this.page).toHaveURL(/overview/);
  }

  async loginAndExpectFailure(username: string, password: string) {
    await this.login(username, password);
    await expect(this.errorMsg).toBeVisible();
  }
}
