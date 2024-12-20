import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';

test.describe('Pruebas de Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('debería iniciar sesión con credenciales válidas', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('debería mostrar un error con credenciales inválidas', async ({ page }) => {
    await loginPage.login('usuario_invalido', 'password_invalido');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
  });
});
