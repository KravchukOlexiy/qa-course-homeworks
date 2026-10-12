import { expect, Page } from '@playwright/test'

export async function login(page: Page, email: string, password: string) {
    await page.getByTestId('auth-email').fill(email);
    await page.getByTestId('auth-password').fill(password);
    await page.getByTestId('auth-submit').click();
}

export async function createArticle(page: Page, title: string, description: string, body: string) {
    await page.getByTestId('nav-new-article').click();
    await expect(page.locator('h1')).toHaveText('New article');
    await page.getByTestId('editor-title').fill(title);
    await page.getByTestId('editor-description').fill(description);
    await page.getByTestId('editor-body').fill(body);
    await page.getByTestId('editor-submit').click();
    await expect(page.getByTestId('article-title')).toHaveText(title);
}

export async function openProfilePage(page: Page) {
    await page.goto('/articles/profile/olena');
    await expect(page.getByTestId('preview-title').first()).toBeVisible();
}