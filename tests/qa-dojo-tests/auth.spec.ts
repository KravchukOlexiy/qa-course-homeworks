import { test, expect } from '@playwright/test';

test.beforeEach('Open start URL', async ({ page }) => {
  await page.goto('/articles');
});

test.describe('Registration tests', () => {

  test('Profile name should appear in header after success registration', async ({ page }) => {
    const uniqueUsername = `student-${Date.now()}`;
    const uniqueEmail = uniqueUsername + `-@example.com`;
    const password = 'kravkrav123';

    await page.getByTestId('nav-sign-up').click();
    await page.getByTestId('auth-username').fill(uniqueUsername);
    await page.getByTestId('auth-email').fill(uniqueEmail);
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill(password);
    await page.getByTestId('register-confirm-password').fill(password);
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('nav-profile')).toContainText(uniqueUsername);
  });

  test('Error message should appear after registration with already used email', async ({ page }) => {
    await page.getByTestId('nav-sign-up').click();
    await page.getByTestId('auth-username').fill('krav.krav');
    await page.getByTestId('auth-email').fill('krav@gmail.com');
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('kravkrav123');
    await page.getByTestId('register-confirm-password').fill('kravkrav123');
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('error-messages')).toContainText('body email або username вже зайняті');
  });

  test('Error messages should appear after submit empty form', async ({ page }) => {
    await page.getByTestId('nav-sign-up').click();
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('error-messages')).toContainText('username ім\'я має містити щонайменше 3 символи');
    await expect(page.getByTestId('error-messages')).toContainText('email некоректний email');
    await expect(page.getByTestId('error-messages')).toContainText('password пароль має містити щонайменше 6 символів');
  });
});

test.describe('Authorization tests', () => {


  test('Profile name should appear in header after success authorization', async ({ page }) => {
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill('krav@gmail.com');
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('kravkrav123');
    await page.getByTestId('auth-submit').click();

    await expect(page.getByTestId('nav-profile')).toContainText('krav.krav');
  });

  test('Error should appear after authorization with wrong password', async ({ page }) => {
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill('krav@gmail.com');
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('kravkrav1231');
    await page.getByTestId('auth-submit').click();

    await expect(page.getByTestId('error-messages').getByRole('paragraph')).toContainText('email or password неправильні');
  });

  test('Error should appear after authorization with not exist user', async ({ page }) => {
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('auth-email').click();
    await page.getByTestId('auth-email').fill('krav1@gmail.com');
    await page.getByTestId('auth-password').click();
    await page.getByTestId('auth-password').fill('kravkrav123');
    await page.getByTestId('auth-submit').click();

    await expect(page.getByTestId('error-messages').getByRole('paragraph')).toContainText('email or password неправильні');
  });
})
