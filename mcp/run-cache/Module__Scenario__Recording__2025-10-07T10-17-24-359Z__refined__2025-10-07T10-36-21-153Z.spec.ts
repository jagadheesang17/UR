import { test, expect } from '@playwright/test';

test('refined', async ({ page }) => {
  await page.goto('/learner/qaprod1/');
  await page.locator('#signin').click();
  await page.getByRole('textbox', { name: /Username\*/i }).click();
  await page.getByRole('textbox', { name: /Username\*/i }).fill(process.env.E1_USER || 'qaprod1@nomail.com');
  await page.getByRole('textbox', { name: /Password\*/i }).click();
  await page.getByRole('textbox', { name: /Password\*/i }).fill(process.env.E1_PASS || 'Password1!');
  await page.locator('#login-form i').click();
  await page.getByRole('textbox', { name: /Password\*/i }).click();
  await page.getByRole('textbox', { name: /Password\*/i }).fill(process.env.E1_PASS || 'Password1!');
  await page.getByRole('button', { name: /Sign In/i }).click();
  await page.goto('/admin/');
  await expect(page.locator('#lms-mobile-viewnav')).toContainText('qa prod1');
  await page.goto('/admin/');
});