import { Page, Locator } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class HomePage extends AbstractPage {
  readonly signInBtn: Locator;
  readonly usernameInput: Locator;
  readonly careersLink: Locator;
  readonly openPositionBtn: Locator;
  readonly cookiesAcceptBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.signInBtn = page.locator('[href*="Login"]').last();
    this.usernameInput = page.locator('#Email');
    this.careersLink = page.locator('[href="/careers"]');
    this.openPositionBtn = page.locator('[href="#open-positions"]');
    this.cookiesAcceptBtn = page.locator('a[class*="dismiss"]');
  }

  async visit() {
    await this.page.goto('/');
    await this.cookiesAcceptBtn.click();
    return this;
  }

  async openLoginForm() {
    await this.signInBtn.click();
  }

  async scrollUntilElementIsVisible(page, locator) {
    while (!(await locator.isVisible())) {
      await page.mouse.wheel(0, 600);
    }
  }

  async openCareersPage() {
    await this.careersLink.click();
  }
}
