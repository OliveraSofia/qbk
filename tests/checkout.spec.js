import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';
import ProductsPage from '../pages/product';
import CheckoutPage from '../pages/checkout';
import CartPage from '../pages/cart';
import chcheckoutElements from '../elements/checkout'

test.describe('Pruebas de la página de checkout', () => {
  let checkoutPage;
  let loginPage;
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate('https://www.saucedemo.com');
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await loginPage.navigate('https://www.saucedemo.com/checkout-step-one.html');
    
  });
 

  test('US6. Verificar campos en la página de checkout', async ({ page }) => {
    await expect(page.locator(chcheckoutElements.firstNameInput)).toBeVisible();
    await expect(page.locator(chcheckoutElements.lastNameInput)).toBeVisible();
    await expect(page.locator(chcheckoutElements.postalCodeInput)).toBeVisible();
    await expect(page.locator(chcheckoutElements.cancelButton)).toBeVisible();
    await expect(page.locator(chcheckoutElements.continueButton)).toBeVisible();
  });

  test('US7. Verificar los campos obligatorios', async ({ page }) => {
    // Intentar enviar el formulario sin completar los campos
    await page.click(chcheckoutElements.continueButton);
  
    // Verificar que se muestren mensajes de error para campos vacíos
    const errorMessageLocator = page.locator(chcheckoutElements.errorMessage);
    await expect(errorMessageLocator).toHaveText('Error: First Name is required');
    
  });

  test('US8. Verifica que el monto total sea correcto en Checkout Overview', async ({ page }) => {

    await checkoutPage.fillCheckoutInformation('Juan', 'perez', '1234');
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // Obtener precios de productos seleccionados
    const prices = await checkoutPage.getSelectedProductPrices();
  
    // Obtener impuesto
    const tax = await checkoutPage.getTax();
  
    // Calcular el total esperado (precios + impuesto)
    const calculatedTotal = prices.reduce((acc, price) => acc + price, 0) + tax;
  
    // Obtener el total mostrado en la página
    const displayedTotal = await checkoutPage.getDisplayedTotal();
  
    // Validar que el total calculado coincida con el total mostrado
    expect(displayedTotal).toBeCloseTo(calculatedTotal, 2); // Tolerancia de 2 decimales
  });

  test('US9. Confirmar que se puede completar la compra', async ({ page }) => {
    await checkoutPage.fillCheckoutInformation('Juan', 'perez', '1234');
  
    // Completar la compra
    await checkoutPage.completeOrder();

    // Validar que el mensaje de éxito esté presente
    const successMessage = await checkoutPage.getSuccessMessage();
    expect(successMessage).toContain('Thank you for your order!');
  });
  
  test('US10. Cerrar sesión del sitio', async ({ page }) => {
    
    // Realizar logout
    await checkoutPage.logout();
  
    // Verificar que se redirige a la página de inicio de sesión
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
  
  


});