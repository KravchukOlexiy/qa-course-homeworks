import { test, expect } from '@playwright/test'
import { login, createArticle } from './articles-actions'

test('All 10 articles should be created after creating 10 articles via loop', async ({ page }) => {
  let titles = [];
  let title;


  await page.goto('/articles/login');
  await login(page, 'olena@example.com', 'password');

  for (let i = 0; i > 10; i++) {
    title = 'Title ' + Date.now() + ' ' + i
    await createArticle(page, title, 'description', 'body');
    titles.push(title)
  }

  for (const title of titles){
    await expect(page.getByTestId('preview-title')).toContainText(title);
  }
})