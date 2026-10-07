import { test, expect } from '@playwright/test';
import { openCoffeeCart, clickOnCoffeeCard, hoverCheckout, clickCheckout, fillAndSubmitRegistrationForm } from './coffe-card-actions.spec'

test.beforeEach('Open site', async ({page})=>{
    openCoffeeCart(page);
})

test('Added coffee should appear in Total list', async ({ page }) => {
  await clickOnCoffeeCard(page, 'Espresso');
  await clickOnCoffeeCard(page, 'Espresso_Macchiato');
  await hoverCheckout(page);

  await expect(page.getByText('Espresso x 1+-')).toBeVisible();
  await expect(page.getByText('Espresso Macchiato x 1+-')).toBeVisible();
});

test('Added coffee should appear in basket', async ({ page }) => {
  await clickOnCoffeeCard(page, 'Cafe_Breve');
  await clickCheckout(page);
  await fillAndSubmitRegistrationForm(page, 'oleksii', 'oleksii@gm.com') 
  
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});