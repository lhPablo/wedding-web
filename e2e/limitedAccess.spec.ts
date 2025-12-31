import { test, expect } from '@playwright/test';
import { PASSWORDS, LIMITED_FORM_DATA } from './fixtures/testData';
import {
  login,
  fillMainForm,
  submitFormAndVerifySuccess,
  navigateToSection,
  showNavbar,
} from './helpers/formHelpers';

test.describe('Limited Access User Flow', () => {
  test.describe('Login', () => {
    test('should login successfully with limited access password', async ({ page }) => {
      await login(page, PASSWORDS.LIMITED_ACCESS);
    });
  });

  test.describe('Main Page Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await login(page, PASSWORDS.LIMITED_ACCESS);
      await showNavbar(page);
    });

    test('should display navbar with all sections', async ({ page }) => {
      const navbar = page.locator('#navbar');
      await expect(navbar).toHaveAttribute('data-visible', 'true');
      
      await expect(navbar.locator('a[href="#home"]')).toBeVisible();
      await expect(navbar.locator('a[href="#gift"]')).toBeVisible();
      await expect(navbar.locator('a[href="#assistance"]')).toBeVisible();
      await expect(navbar.locator('a[href="#location"]')).toBeVisible();
      await expect(navbar.locator('a[href="#transport"]')).toBeVisible();
      await expect(navbar.locator('a[href="#questions"]')).toBeVisible();
      await expect(navbar.locator('a[href="#contact"]')).toBeVisible();
    });

    test('should navigate to different sections using navbar', async ({ page }) => {
      const navbar = page.locator('#navbar');
      
      await navbar.locator('a[href="#assistance"]').click();
      await expect(page.locator('#assistance')).toBeInViewport();
      
      await navbar.locator('a[href="#gift"]').click();
      await expect(page.locator('#gift')).toBeInViewport();
      
      await navbar.locator('a[href="#contact"]').click();
      await expect(page.locator('#contact')).toBeInViewport();
    });
  });

  test.describe('Assistance Form - Limited Access', () => {
    test.beforeEach(async ({ page }) => {
      await login(page, PASSWORDS.LIMITED_ACCESS);
      await navigateToSection(page, '#assistance');
    });

    test('should display assistance form with main fields', async ({ page }) => {
      await expect(page.locator('#name')).toBeVisible();
      await expect(page.locator('#age')).toBeVisible();
      await expect(page.locator('#menu_type')).toBeVisible();
      await expect(page.locator('#phone')).toBeVisible();
      await expect(page.locator('#bus')).toBeVisible();
    });

    test('should NOT show companions selector for limited access', async ({ page }) => {
      const companionsContainer = page.locator('#companions').locator('..');
      await expect(companionsContainer).toBeHidden();
    });

    test('should submit form successfully without companions', async ({ page }) => {
      await fillMainForm(page, LIMITED_FORM_DATA);
      await submitFormAndVerifySuccess(page);
    });
  });
});
