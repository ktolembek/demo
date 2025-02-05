import { test, expect } from '@playwright/test';

test('Heading should contain site title', async ({ page }) => {
  await page.goto('/example-1');
  await expect(page.locator('h1')).toHaveText('My Awesome Web Application');
});
