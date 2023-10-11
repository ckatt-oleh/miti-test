import { Locator, Page, expect } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
import { ContactForm } from '../interfaces/contact-form.interface';

export class ContactPage extends AbstractPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly countrySelect: Locator;
  readonly emailInput: Locator;
  readonly interestedInSelect: Locator;
  readonly howCanWeHelpTextarea: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('input[name*="firstName"]');
    this.lastNameInput = page.locator('input[name*="lastName"]');
    this.companyInput = page.locator('input[name*="company"]');
    this.countrySelect = page.locator('select[name*="country"]');
    this.emailInput = page.locator('input[name*="email"]');
    this.interestedInSelect = page.locator('select[name*="iWantTo"]');
    this.howCanWeHelpTextarea = page.locator('textarea[name*="howCanWeHelp"]');
  }

  async fillForm(formData: ContactForm) {
    formData.firstName && (await this.firstNameInput.fill(formData.firstName));
    formData.lastName && (await this.lastNameInput.fill(formData.lastName));
    formData.company && (await this.companyInput.fill(formData.company));
    formData.country &&
      (await this.countrySelect.selectOption(formData.country));
    await this.emailInput.fill(formData.email);
    formData.interestedIn &&
      (await this.interestedInSelect.selectOption(formData.interestedIn));
    formData.howCanWeHelp &&
      (await this.howCanWeHelpTextarea.fill(formData.howCanWeHelp));
  }

  async checkFormData(formData: ContactForm) {
    formData.firstName &&
      (await expect(this.firstNameInput).toHaveValue(formData.firstName));
    formData.lastName &&
      (await expect(this.lastNameInput).toHaveValue(formData.lastName));
    formData.company &&
      (await expect(this.companyInput).toHaveValue(formData.company));
    await expect(this.emailInput).toHaveValue(formData.email);
    formData.howCanWeHelp &&
      (await expect(this.howCanWeHelpTextarea).toHaveValue(
        formData.howCanWeHelp,
      ));
  }
}
