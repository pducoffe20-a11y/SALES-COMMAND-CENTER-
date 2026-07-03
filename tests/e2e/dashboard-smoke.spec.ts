import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const screenshotDir = 'docs/screenshots/playwright';

test.describe('Sales Command Center dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Decide the next best sales move/i })).toBeVisible();
    await expect(page.getByText('Today Command Center')).toBeVisible();
    await expect(page.getByText('Priority queue')).toBeVisible();
  });

  test('loads the dashboard and captures desktop layout', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'Desktop screenshot runs only in the desktop project.');
    await mkdir(screenshotDir, { recursive: true });
    await expect(page.locator('#today')).toBeVisible();
    await page.screenshot({ path: `${screenshotDir}/dashboard-desktop.png`, fullPage: true });
  });

  test('loads the dashboard and captures mobile layout', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile', 'Mobile screenshot runs only in the mobile project.');
    await mkdir(screenshotDir, { recursive: true });
    await expect(page.locator('#today')).toBeVisible();
    await page.screenshot({ path: `${screenshotDir}/dashboard-mobile.png`, fullPage: true });
  });
});
