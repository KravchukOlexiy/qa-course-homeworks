import { test, expect } from '@playwright/test';

test.beforeEach('Open start URL', async ({ page }) => {
  await page.goto('http://104.168.59.50/laboratory/aria');
});

test.describe('Accessability attributes practice', () => {

  test('Test1', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email адреса *' }).fill('student@example.com');
    await page.getByLabel('Пароль').fill('Qwerty123');
    await page.getByRole('combobox', { name: 'Країна *' }).selectOption('Україна');
    await page.getByRole('radio', { name: 'Junior' }).check();
    await page.getByRole('checkbox', { name: 'Я погоджуюся з умовами лабораторії *' }).check();
    await page.getByRole('button', { name: 'Створити профіль' }).click();
    await expect(page.getByTestId('aria-form-status')).toHaveText('Профіль створено: student@example.com, ua, рівень junior.');
  });

  test('Test2', async ({ page }) => {
    await expect(page.getByRole('rowheader')).toHaveCount(3);
  });

  test('Test3', async ({ page }) => {
    const mariaRow = page.getByRole('rowheader').filter({ hasText: 'Марія Коваль' });
    await expect(mariaRow).toHaveCount(1);
  });

  test('Test5', async ({ page }) => {
    await expect(page.getByRole('rowheader').nth(0)).toHaveText('Іван Петренко');
  });
});