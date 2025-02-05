import { test, expect } from '@playwright/test';

test.describe('Example 4: Click, Check, Select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/example-4');
  });

  test('should handle click and double-click events', async ({ page }) => {
    const optionOne = page.locator('[data-cy=box-1-items-list]').getByText('Option One');
    
    await optionOne.click();
    await expect(optionOne).toHaveCSS('background-color', 'rgb(221, 221, 221)');
    
    await optionOne.dblclick();
    await expect(page.locator('[data-cy=box-1-selected-name]')).toHaveText('Option One');
  });

  test('should handle checkbox selection', async ({ page }) => {
    await page.locator('[data-cy=box-2-checkboxes]').getByText('Option One').click();
    await expect(page.locator('[data-cy=box-2-selected-count]')).toHaveText('1');

    await page.locator('[data-cy=box-2-checkboxes]').getByText('Option Two').click();
    await expect(page.locator('[data-cy=box-2-selected-count]')).toHaveText('2');
  });

  test('should handle dropdown selection', async ({ page }) => {
    await page.locator('[data-cy=box-3-dropdown]').selectOption('Option Two');
    await expect(page.locator('[data-cy=box-3-selected-name]')).toHaveText('Option Two');
  });

  test('should handle mouseover events', async ({ page }) => {
    const optionThree = page.locator('[data-cy=box-4-items-list]').getByText('Option Three');
    
    await optionThree.hover();
    await expect(page.locator('[data-cy=box-4-selected-name]')).toHaveText('Option Three');
  });

  test('should display the correct number of checked checkboxes', async ({ page }) => {
    const checkboxes = page.locator('[data-cy=box-2-checkboxes] input[type=checkbox]');
    const countText = page.locator('[data-cy=box-2-selected-count]');

    await expect(countText).toHaveText('0');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    await expect(countText).toHaveText('2');

    await checkboxes.nth(1).uncheck();
    await expect(countText).toHaveText('1');
  });

  test('should verify the number of items in box 1 list', async ({ page }) => {
    const listItems = page.locator('[data-cy=box-1-items-list] > li');
    await expect(listItems).toHaveCount(3);
  });
});
