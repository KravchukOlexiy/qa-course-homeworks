import { Page } from '@playwright/test'


export async function openCoffeeCart(page: Page) {
    await page.goto('');
}

export async function clickOnCoffeeCard(page: Page, coffeeName: string) {
    await page.getByTestId(coffeeName).click();
}

export async function hoverCheckout(page: Page) {
    await page.getByTestId('checkout').hover();
}

export async function clickCheckout(page: Page) {
    await page.getByTestId('checkout').click();
}

export async function fillAndSubmitRegistrationForm(page: Page, name: string, email: string) {
    await page.getByRole('textbox', { name: 'Name' }).fill(name);
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Promotion message').click();
    await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
    await page.getByRole('button', { name: 'Submit' }).click();
}

