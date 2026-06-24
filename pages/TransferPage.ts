import { Page, expect } from "@playwright/test";

export class TransferPage {
  constructor(private page: Page) {}

  private amountInput = this.page.locator("#amount");
  private fromAccount = this.page.locator("#fromAccountId");
  private toAccount = this.page.locator("#toAccountId");
  private transferBtn = this.page.locator('input[value="Transfer"]');
  private successMsg = this.page.locator("#showResult");

  async goto() {
    await this.page.click('a[href*="transfer"]');
  }

  async transfer(amount: string) {
    await this.amountInput.fill(amount);
    await this.transferBtn.click();
  }

  async verifyTransferSuccess() {
    await expect(this.successMsg).toContainText("Transfer Complete");
  }
}
