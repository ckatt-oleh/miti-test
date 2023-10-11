import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { CareersPage } from '../../page-objects/CareersPage';

test.describe.parallel('Position filter test cases', () => {
  let homePage: HomePage;
  let careersPage: CareersPage;

  const filters = [
    {
      position: 'Data',
    },
    {
      position: 'Engineering',
    },
    {
      position: 'Legal',
    },
    {
      position: 'Product',
    },
  ];

  test.beforeEach(async ({ page }) => {
    careersPage = new CareersPage(page);
    homePage = new HomePage(page);
    (await homePage.visit()).openCareersPage();
    await careersPage.moveToPositionRows();
  });

  filters.forEach((filter) => {
    test(`Checking filter ${filter.position}`, async () => {
      await careersPage.positionFilterBy(filter);
    });
  });
});
