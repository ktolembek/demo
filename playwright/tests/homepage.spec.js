import { test, expect } from '@playwright/test';

test.describe('Navigation Test for Modern Testing Workshop', () => {
  test('should navigate to each example page from the home page', async ({ page }) => {
    // Go to the home page
    await page.goto('/');

    // Define the buttons and their expected URLs
    const buttons = [
      { text: 'Example 1: simple assertion', url: '/example-1' },
      { text: 'Example 2: text input', url: '/example-2' },
      { text: 'Example 3: multiple inputs', url: '/example-3' },
      { text: 'Example 4: Click, check, select', url: '/example-4' },
    ];

    // Iterate over each button, click it, and verify the URL
    for (const button of buttons) {
      await page.getByText(button.text).click();
      await expect(page).toHaveURL(new RegExp(button.url)); // Check if URL contains the expected path
      await page.goBack(); // Navigate back to the home page
    }
  });
});