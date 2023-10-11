import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { CareersPage } from '../../page-objects/CareersPage';
import { ContactPage } from '../../page-objects/ContactPage';
import { randomContacttData } from '../../helpers/random-objects-data/random-contact-data.helper';

test.describe('Position functionality test cases', () => {
  let homePage: HomePage;
  let careersPage: CareersPage;
  let contactPage: ContactPage;

  const contactData = randomContacttData();

  test.beforeEach(async ({ page }) => {
    careersPage = new CareersPage(page);
    contactPage = new ContactPage(page);
    homePage = new HomePage(page);
    (await homePage.visit()).openCareersPage();
    await careersPage.moveToPositionRows();
  });

  test('Checking Data position description', async () => {
    await careersPage.openDataPDFdescription();
  });

  test('Apply to Data position', async () => {
    await careersPage.openDataDescription();
    await careersPage.applyToDataPosition();
    await contactPage.fillForm(contactData);
    // Do not click on Contact us to avoid creation data on prod DB
  });
});
