import { Page, expect } from "@playwright/test";

export class DashboardPage {
  constructor(private page: Page) {}

  private accountTable = this.page.locator("#accountTable");
  private rows = this.page.locator("#accountTable tbody tr");

  async verifyDashboardLoaded() {
    await expect(this.accountTable).toBeVisible();
    await expect(this.rows.first()).toBeVisible(); // ensure data exists
  }

  async getAllBalances(): Promise<number[]> {
    const balances: number[] = [];

    const count = await this.rows.count();

    for (let i = 0; i < count; i++) {
      const text = await this.rows
        .nth(i)
        .locator("td:nth-child(2)")
        .innerText();

      // remove $ and convert to number
      const value = parseFloat(text.replace("$", "").trim());
      balances.push(value);
    }

    return balances;
  }

  async getTotalBalance(): Promise<number> {
    const balances = await this.getAllBalances();
    return balances.reduce((sum, val) => sum + val, 0);
  }
}
