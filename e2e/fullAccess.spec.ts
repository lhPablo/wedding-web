import { test, expect } from '@playwright/test';
import { PASSWORDS, MAIN_FORM_DATA, MAIN_FORM_DATA_WITH_COMPANION, COMPANION_DATA } from './fixtures/testData';
import {
  login,
  fillMainForm,
  fillCompanionForm,
  submitFormAndVerifySuccess,
  navigateToSection,
  showNavbar,
} from './helpers/formHelpers';

test.describe('Full Access User Flow', () => {
  test.describe('Login', () => {
    test('should show login form on homepage', async ({ page }) => {
      await page.goto('/');
      
      await expect(page.getByRole('heading', { name: 'Bienvenido' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Código de embarque' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
    });

    test('should show error with wrong password', async ({ page }) => {
      await page.goto('/');
      
      await page.getByRole('textbox', { name: 'Código de embarque' }).fill('contraseña_incorrecta');
      await page.getByRole('button', { name: 'Entrar' }).click();
      
      const passwordInput = page.getByRole('textbox', { name: 'Código de embarque' });
      await expect(passwordInput).toHaveAttribute('data-error', 'true');
      
      await expect(page).toHaveURL('/');
    });

    test('should login successfully with correct password and redirect to main', async ({ page }) => {
      await login(page, PASSWORDS.FULL_ACCESS);
    });
  });

  test.describe('Main Page Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await login(page, PASSWORDS.FULL_ACCESS);
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

  test.describe('Assistance Form - Full Access', () => {
    test.beforeEach(async ({ page }) => {
      await login(page, PASSWORDS.FULL_ACCESS);
      await navigateToSection(page, '#assistance');
    });

    test('should display assistance form with all fields', async ({ page }) => {
      await expect(page.locator('#name')).toBeVisible();
      await expect(page.locator('#age')).toBeVisible();
      await expect(page.locator('#menu_type')).toBeVisible();
      await expect(page.locator('#phone')).toBeVisible();
      await expect(page.locator('#bus')).toBeVisible();
      await expect(page.locator('#companions')).toBeVisible();
    });

    test('should allow adding companions for full access', async ({ page }) => {
      await page.locator('#companions').selectOption('1');
      
      const companionSection = page.locator('[data-companions-section]');
      await expect(companionSection).toBeVisible();
      
      const companionCard = page.locator('[data-companion-card]').first();
      await expect(companionCard).toBeVisible();
    });

    test('should submit form successfully', async ({ page }) => {
      await fillMainForm(page, MAIN_FORM_DATA);
      await submitFormAndVerifySuccess(page);
    });

    test('should submit form with companion successfully', async ({ page }) => {
      await fillMainForm(page, MAIN_FORM_DATA_WITH_COMPANION);
      await fillCompanionForm(page, 1, COMPANION_DATA);
      await submitFormAndVerifySuccess(page);
    });
  });
});
