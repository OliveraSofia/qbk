import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';

test.describe('Pruebas de Login', () => {
  let loginPage;
    // Test para inicializar la página de login y navegar hacia ella antes de que comience cada prueba
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('US1. Iniciar sesión con credenciales válidas', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('US2. Iniciar sesión con credenciales válidas y mostrar un error', async ({ page }) => {
    await loginPage.login('usuario_invalido', 'password_invalido');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
  });
});
