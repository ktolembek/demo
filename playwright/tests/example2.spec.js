import { test, expect } from '@playwright/test';

test.describe('Example 2: Text Input', () => {
  test('should update the character counter correctly', async ({ page }) => {
    await page.goto('/example-2');

    await page.locator('[data-cy=max-char-input]').fill('Test Text');
    await expect(page.locator('[data-cy=chars-left-count]')).toHaveText('6');
  });

  test.only('should update the character counter correctly - deprecated', async ({ page }) => {
    await page.goto('/example-2');
    await page.locator('[data-cy=max-char-input]').type('Hello');
    await expect(page.locator('[data-cy=chars-left-count]')).toHaveText('10');
  });

  test('displays the appropriate remaining characters count', async ({ page }) => {
    await page.goto('/example-2');

    const input = page.locator('[data-cy=max-char-input]');
    const counter = page.locator('[data-cy=chars-left-count]');

    await expect(counter).toHaveText('15');

    await input.type('Hello');
    await expect(counter).toHaveText('10');

    await input.type('Hello');
    await expect(counter).toHaveText('5');

    await input.type('Hello');
    await expect(input).toHaveValue('HelloHelloHello');
    await expect(counter).toHaveText('0');
  });
});
