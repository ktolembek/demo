import { test, expect } from '@playwright/test';

test.describe('Example 3: Multiple Text Inputs', () => {
  test('should update the character counter for both inputs independently', async ({ page }) => {
    await page.goto('/example-3');

    const firstNameInput = page.locator('[data-cy=input-first-name]');
    const lastNameInput = page.locator('[data-cy=input-last-name]');

    await firstNameInput.type('John');
    await expect(page.locator('[data-cy=first-name-chars-left-count]')).toHaveText('11');

    await lastNameInput.type('Doe');
    await expect(page.locator('[data-cy=last-name-chars-left-count]')).toHaveText('12');
  });

  test('should display a greeting when input is entered', async ({ page }) => {
    await page.goto('/example-3');

    const nameInput = page.locator('[data-cy=name-input]');
    const greetingText = page.locator('[data-cy=name-greeting]');

    await expect(greetingText).toHaveText('');

    await nameInput.type('Ken');
    await expect(greetingText).toHaveText('Hello, Ken!');
  });
});
