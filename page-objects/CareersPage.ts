import { expect, Page, Locator } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
import { PositionFilter } from '../interfaces/position-filter.interface';

export class CareersPage extends AbstractPage {
  readonly openPositionBtn: Locator;
  readonly tableElemet: Locator;
  readonly dataFilterBtn: Locator;
  readonly engineeringFilterBtn: Locator;
  readonly legalFilterBtn: Locator;
  readonly productFilterBtn: Locator;
  readonly dataRow: Locator;
  readonly engineeringRow: Locator;
  readonly legalRow: Locator;
  readonly productRow: Locator;
  readonly dataLearMoreBtn: Locator;
  readonly pdfScreen: Locator;
  readonly applyToPositionBtn: Locator;
  readonly openDescriptionElement: Locator;

  constructor(page: Page) {
    super(page);
    this.openPositionBtn = page.locator('[href="#open-positions"]');
    this.tableElemet = page.locator('div[data-tag]').nth(0);
    this.dataRow = page.locator('[data-tag="data"]>a').nth(0);
    this.engineeringRow = page.locator('[data-tag="engineering"]>a').nth(0);
    this.legalRow = page.locator('[data-tag="legal"]>a').nth(0);
    this.productRow = page.locator('[data-tag="product"]>a').nth(0);
    this.dataFilterBtn = page.locator(
      `[jl-filter-control="[data-tag~='data']"]>a`,
    );
    this.engineeringFilterBtn = page.locator(
      `[jl-filter-control="[data-tag~='engineering']"]>a`,
    );
    this.engineeringFilterBtn = page.locator(
      `[jl-filter-control="[data-tag~='engineering']"]>a`,
    );
    this.legalFilterBtn = page.locator(
      `[jl-filter-control="[data-tag~='legal']"]>a`,
    );
    this.productFilterBtn = page.locator(
      `[jl-filter-control="[data-tag~='product']"]>a`,
    );
    this.dataLearMoreBtn = page.locator(
      `//div[@data-tag="data"]//a[contains(@class,"button-primary")]`,
    );
    this.pdfScreen = page.locator(`[type="application/pdf"]`);
    this.applyToPositionBtn = page
      .locator(`//div[@class="moduletable "]//a[@href="/contact"]`)
      .nth(0);
    this.openDescriptionElement = page.locator('[class*="open"]');
  }

  async moveToPositionRows() {
    await this.openPositionBtn.click();
    await expect(this.tableElemet).toBeVisible();
  }

  async positionFilterBy(position: PositionFilter) {
    switch (position.position) {
      case 'Data':
        this.dataFilterBtn.click();
        await expect(this.engineeringRow).toBeHidden();
        await expect(this.dataRow).toBeVisible();
        break;
      case 'Engineering':
        this.engineeringFilterBtn.click();
        await expect(this.dataRow).toBeHidden();
        await expect(this.engineeringRow).toBeVisible();
        break;
      case 'Legal':
        this.legalFilterBtn.click();
        await expect(this.engineeringRow).toBeHidden();
        await expect(this.legalRow).toBeVisible();
        break;
      case 'Product':
        this.productFilterBtn.click();
        await expect(this.engineeringRow).toBeHidden();
        await expect(this.productRow).toBeVisible();
        break;
      default:
        break;
    }
  }

  async openDataDescription() {
    await expect(this.dataRow).toBeVisible();
    await this.dataRow.click();
  }

  async openDataPDFdescription() {
    await this.openDataDescription();
    await this.dataLearMoreBtn.click();
    await expect(this.pdfScreen).toBeVisible();
    // Left wait to see pdf screenshot in report file
    await super.wait(3000);
  }

  async applyToDataPosition() {
    await this.applyToPositionBtn.click();
  }
}
