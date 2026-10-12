import { test, expect } from '@playwright/test'
import { login, createArticle, openProfilePage } from './articles-actions'

test('All 10 articles should be created after creating 10 articles via loop', async ({ page }) => {
  const titles: string[] = [];

  await page.goto('/articles/login');
  await login(page, 'olena@example.com', 'password');

  for (let i = 0; i < 10; i++) {
    const title = 'Title ' + Date.now() + ' ' + i;
    await createArticle(page, title, 'description', 'body');
    titles.push(title);
  }

  await openProfilePage(page);

  const actualTitles = await page.getByTestId('preview-title').allTextContents();
  for (const title of titles) {
    expect(actualTitles).toContain(title);
  }
})