import { test, expect } from '@playwright/test';

test('Nine different cups of coffee with prices should be presented on main page', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await expect(page.locator('#app')).toContainText('Espresso $10.00');
  await expect(page.locator('#app')).toContainText('Espresso Macchiato $12.00');
  await expect(page.locator('#app')).toContainText('Cappuccino $19.00');
  await expect(page.locator('#app')).toContainText('Mocha $8.00');
  await expect(page.locator('#app')).toContainText('Flat White $18.00');
  await expect(page.locator('#app')).toContainText('Americano $7.00');
  await expect(page.locator('#app')).toContainText('Cafe Latte $16.00');
  await expect(page.locator('#app')).toContainText('Espresso Con Panna $14.00');
  await expect(page.locator('#app')).toContainText('Cafe Breve $15.00');
});


test('Total price should be changed after adding coffee', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $0.00');
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $10.00');
});


test('Promo proposition should appear after adding three cups of coffee', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await expect(page.locator('#app')).toContainText('Yes, of course!');
  await expect(page.locator('#app')).toContainText('Nah, I\'ll skip.');
});


test('Added coffee should appear in Total list', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="checkout"]').hover();
  await expect(page.getByText('Espresso x 1+-')).toBeVisible();
  await expect(page.getByText('Espresso Macchiato x 1+-')).toBeVisible();
});

test('Added coffee should appear in basket', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cafe_Breve"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('oleksii');
  await page.getByRole('textbox', { name: 'Email' }).fill('oleksii@gm.com');
  await page.getByLabel('Promotion message').click();
  await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});
