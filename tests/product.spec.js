import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';
import ProductsPage from '../pages/product';

test.describe('Pruebas de la página de productos', () => {

  let loginPage;
  let productsPage;
    // Test para inicializar la página de login y navegar hacia ella antes de que comience cada prueba
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    // Test para Navegar e iniciar sesión antes de cada prueba
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });
  
  test('US3. Validar agregar productos al carrito', async ({ page }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    const cartItems = await productsPage.getCartItemCount();
    expect(cartItems).toBe(2);
  });

  test('US3. Validar eliminar productos del carrito', async ({ page }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await productsPage.removeProductFromCart('Sauce Labs Bike Light');

    const cartItems = await productsPage.getCartItemCount();
    expect(cartItems).toBe(1);
  });

  test('US4. Validar ordenar productos por nombre', async ({ page }) => {
    await productsPage.sortProductsBy('az'); 

    const productNames = await productsPage.getProductNames();
    const sortedNames = [...productNames].sort();

    expect(productNames).toEqual(sortedNames);
  });

  test('US4. Validar ordenar productos por precio', async ({ page }) => {
    await productsPage.sortProductsBy('lohi'); // Orden ascendente por precio
  
    const productPrices = await productsPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => a + b);  // Ordenamos los precios de menor a mayor
  
    expect(productPrices).toEqual(sortedPrices);
  });

  test('US5. Validar acceder a la página de detalles desde el nombre', async ({ page }) => {
    await productsPage.clickProductDetail('Sauce Labs Backpack');

    const productTitle = await productsPage.getProductDetailTitle('Sauce Labs Backpack');
    expect(productTitle).toBe('Sauce Labs Backpack');
  });

  test('US5. Validar acceder a la página de detalles desde la imagen', async ({ page }) => {
    await productsPage.clickProductImage('Sauce Labs Backpack');

    const productTitle = await productsPage.getProductDetailTitle('Sauce Labs Backpack');
    expect(productTitle).toBe('Sauce Labs Backpack');
  });

});
