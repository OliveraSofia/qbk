import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';
import ProductsPage from '../pages/product';
import CheckoutPage from '../pages/checkout';
import CartPage from '../pages/cart';
import chcheckoutElements from '../elements/checkout'
import config from '../config.json';

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

    await loginPage.navigate(config.loginData.url);
    await loginPage.login(config.loginData.username, config.loginData.password);
    await productsPage.addProductToCart(config.productData.productSauseBackpk);
    await productsPage.addProductToCart(config.productData.productLigthSauseBackpk);
    await loginPage.navigate(config.checkoutData.urlStepOne);
    
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
    await expect(errorMessageLocator).toHaveText(config.checkoutData.formError);
    
  });

  test('US8. Verifica que el monto total sea correcto en Checkout Overview', async ({ page }) => {

    await checkoutPage.fillCheckoutInformation(config.checkoutData.checkoutInfoName, config.checkoutData.checkoutInfoLastName, config.checkoutData.checkoutInfoZipCode);
  await expect(page).toHaveURL(config.checkoutData.urlStepTwo);

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
    await checkoutPage.fillCheckoutInformation(config.checkoutData.checkoutInfoName, config.checkoutData.checkoutInfoLastName, config.checkoutData.checkoutInfoZipCode);
  
    // Completar la compra
    await checkoutPage.completeOrder();

    // Validar que el mensaje de éxito esté presente
    const successMessage = await checkoutPage.getSuccessMessage();
    expect(successMessage).toContain(config.checkoutData.successMessage);
  });
  
  test('US10. Cerrar sesión del sitio', async ({ page }) => {
    
    // Realizar logout
    await checkoutPage.logout();
  
    // Verificar que se redirige a la página de inicio de sesión
    await expect(page).toHaveURL(config.loginData.url);
  });
  
  


});