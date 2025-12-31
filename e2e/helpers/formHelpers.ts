import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

interface MainFormData {
  name: string;
  age: string;
  menuType: string;
  phone: string;
  bus: string;
  companions?: string;
}

interface CompanionData {
  name: string;
  relation: string;
  age: string;
  menuType: string;
  allergies: string;
}

export async function login(page: Page, password: string): Promise<void> {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Código de embarque' }).fill(password);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/\/main(#.*)?$/, { timeout: 5000 });
}

export async function fillMainForm(page: Page, data: MainFormData): Promise<void> {
  await page.locator('#name').fill(data.name);
  await page.locator('#age').selectOption(data.age);
  await page.locator('#menu_type').selectOption(data.menuType);
  await page.locator('#phone').fill(data.phone);
  await page.locator('#bus').selectOption(data.bus);
  
  if (data.companions !== undefined) {
    await page.locator('#companions').selectOption(data.companions);
  }
}

export async function fillCompanionForm(
  page: Page,
  companionIndex: number,
  data: CompanionData
): Promise<void> {
  await page.locator(`#companion_${companionIndex}_name`).fill(data.name);
  await page.locator(`#companion_${companionIndex}_relation`).selectOption(data.relation);
  await page.locator(`#companion_${companionIndex}_age`).selectOption(data.age);
  await page.locator(`#companion_${companionIndex}_menu_type`).selectOption(data.menuType);
  await page.locator(`#companion_${companionIndex}_allergies`).fill(data.allergies);
}

export async function submitFormAndVerifySuccess(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Enviar confirmación' }).click();
  
  const successMessage = page.locator('[data-message]');
  await expect(successMessage).toBeVisible({ timeout: 10000 });
  await expect(successMessage).toContainText('¡Gracias por confirmar!');
}

export async function navigateToSection(page: Page, section: string): Promise<void> {
  await page.locator(section).scrollIntoViewIfNeeded();
}

export async function showNavbar(page: Page): Promise<void> {
  await page.locator('#gift').scrollIntoViewIfNeeded();
}
