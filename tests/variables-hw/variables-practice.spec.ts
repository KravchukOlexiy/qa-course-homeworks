import { test, expect } from '@playwright/test';

const baseURL = 'https://coffee-cart.app/';

test('Nine different cups of coffee with prices should be presented on main page', async ({ page }) => {
  const coffeeTitleLocator = page.locator('#app'); 
  await page.goto(baseURL);

  await expect(coffeeTitleLocator).toContainText('Espresso $10.00');
  await expect(coffeeTitleLocator).toContainText('Espresso Macchiato $12.00');
  await expect(coffeeTitleLocator).toContainText('Cappuccino $19.00');
  await expect(coffeeTitleLocator).toContainText('Mocha $8.00');
  await expect(coffeeTitleLocator).toContainText('Flat White $18.00');
  await expect(coffeeTitleLocator).toContainText('Americano $7.00');
  await expect(coffeeTitleLocator).toContainText('Cafe Latte $16.00');
  await expect(coffeeTitleLocator).toContainText('Espresso Con Panna $14.00');
  await expect(coffeeTitleLocator).toContainText('Cafe Breve $15.00');
});


test('Total price should be changed after adding coffee', async ({ page }) => {
  const espressoCupLocator = page.locator('[data-test="Espresso"]');
  const totalBoxLocator = page.locator('[data-test="checkout"]');
  await page.goto(baseURL);

  await espressoCupLocator.click();
  await expect(totalBoxLocator).toContainText('Total: $10.00');
});


test('Promo proposition should appear after adding three cups of coffee', async ({ page }) => {
  const espressoCupLocator = page.locator('[data-test="Espresso"]');
  const espressoMacchiatoCupLocator = page.locator('[data-test="Espresso_Macchiato"]');
  const cappuccinoCupLocator = page.locator('[data-test="Cappuccino"]');
  const promoMessageLocator = page.locator('#app'); 
  await page.goto(baseURL);

  await espressoCupLocator.click();
  await espressoMacchiatoCupLocator.click();
  await cappuccinoCupLocator.click();

  await expect(promoMessageLocator).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await expect(promoMessageLocator).toContainText('Yes, of course!');
  await expect(promoMessageLocator).toContainText('Nah, I\'ll skip.');
});


test('Added coffee should appear in Total list', async ({ page }) => {
   const espressoCupLocator = page.locator('[data-test="Espresso"]');
   const totalBoxLocator = page.locator('[data-test="checkout"]');
   const addedItemsList = page.locator('.list-item');
  await page.goto(baseURL);

  await espressoCupLocator.click();
  await totalBoxLocator.hover();

  await expect(addedItemsList).toContainText('Espresso');
});

test('Added coffee should appear in basket', async ({ page }) => {
  const coffeeBreveCupLocator = page.locator('[data-test="Cafe_Breve"]');
  const totalBoxLocator = page.locator('[data-test="checkout"]');
  const nameFieldOfRegistrationForm = page.locator('[name="name"]');
  const emailFieldOfRegistrationForm =  page.locator('[name="email"]');
  const promotionCheckBoxOfRegistrationForm = page.locator('[name="promotion"]');
  const submitButtonOfRegistrationForm = page.locator('#submit-payment');
  const successRegistrationMessage = page.locator('.success');
  await page.goto(baseURL);

  await coffeeBreveCupLocator.click();
  await totalBoxLocator.click();
  await nameFieldOfRegistrationForm.fill('oleksii');
  await emailFieldOfRegistrationForm.fill('oleksii@gm.com');
  await promotionCheckBoxOfRegistrationForm.check();
  await submitButtonOfRegistrationForm.click();

  await expect(successRegistrationMessage).toBeVisible();
});
