import { expect, Locator, Page } from '@playwright/test';
import { UserCred } from '../interfaces/login.interface';
import { AbstractPage } from './AbstractPage';

export class LoginPage extends AbstractPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly loginForm: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginBtn = page.locator('#loginBtn');
    this.errorMsg = page.locator('[id*="noty_bar"]');
  }

  async submitLoginForm(userCred: UserCred) {
    await this.usernameInput.fill(userCred.username);
    await this.passwordInput.fill(userCred.password);
    await this.loginBtn.click();
    //TODO Sometimes get popup instead of error msg - clarification with developer is needed
    await this.wait(1000);
    await this.loginBtn.click();
  }

  async assertEmailMsgAlert() {
    await expect(this.errorMsg).toContainText(
      'The Email field is not a valid e-mail address',
    );
  }
  async assertCredentialsMsgAlert() {
    await expect(this.errorMsg).toContainText('Invalid login attempt');
  }
  async assertPasswordMsgAlert() {
    await expect(this.errorMsg).toContainText('Password is required');
  }
}
