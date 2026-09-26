import { test, expect } from "@playwright/test"

test.beforeEach('On start', async ({ page }) => {
    await page.goto('laboratory/interactions')
});


test.describe('Describe', () => {

    test('Counter should be increased/decreased after selecting/unselecting checkboxes', async ({ page }) => {
        await expect(page.locator('//*[@data-testid="interactions-selected-count"]')).toContainText('0')
        await page.locator('//*[@data-testid="interactions-row-select-1"]').click()
        await expect(page.locator('//*[@data-testid="interactions-selected-count"]')).toContainText('1')
        await page.locator('//*[@data-testid="interactions-row-select-2"]').click()
        await expect(page.locator('//*[@data-testid="interactions-selected-count"]')).toContainText('2')
        await page.locator('//*[@data-testid="interactions-row-select-2"]').click()
        await expect(page.locator('//*[@data-testid="interactions-selected-count"]')).toContainText('1')
    });

    test('Ask sorting should be by default', async ({ page }) => {
        await expect(page.locator('//*[@data-testid="interactions-table-row-1"]')).toContainText('Авторизація')
        await expect(page.locator('//*[@data-testid="interactions-table-row-4"]')).toContainText('Завантаження файлу')
        await expect(page.locator('//*[@data-testid="interactions-table-row-3"]')).toContainText('Пошук за тегом')
        await expect(page.locator('//*[@data-testid="interactions-table-row-2"]')).toContainText('Створення статті')
    });
});