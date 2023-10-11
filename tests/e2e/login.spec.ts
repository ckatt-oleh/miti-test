import { test } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Login flow test cases', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  const userCredInvalidEmails = [
    {
      username: 'someWrongEmail',
      password: 'somepass',
    },
    {
      username: ' @email.com',
      password: 'somepass',
    },
  ];
  const wrongUserCreds = [
    {
      username: 'test-email@mail.com',
      password: 'somepass',
    },
    {
      username: 'someWrongEmail@email',
      password: 'somepass',
    },
  ];
  const passReq = {
    username: 'someWrongEmail@email',
    password: '',
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    (await homePage.visit()).openLoginForm();
  });
  userCredInvalidEmails.forEach((invalidEmail) => {
    test(`Email - ${invalidEmail.username} is invalid`, async () => {
      await loginPage.submitLoginForm(invalidEmail);
      await loginPage.assertEmailMsgAlert();
    });
  });

  wrongUserCreds.forEach((userCred) => {
    test(`User creds ${userCred.username} are invalid`, async () => {
      await loginPage.submitLoginForm(userCred);
      await loginPage.assertCredentialsMsgAlert();
    });
  });

  test(`Password is required`, async () => {
    await loginPage.submitLoginForm(passReq);
    await loginPage.assertPasswordMsgAlert();
  });
});
