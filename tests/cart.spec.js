import { test, expect } from '@playwright/test';
import ProductsPage from '../pages/product';
import CartPage from '../pages/cart';
import LoginPage from '../pages/login';
import productsElements from '../elements/products';

test.describe('Pruebas de Cart', () => {
    let loginPage;
    let productsPage;
    let cartPage;
    // Test para inicializar la página de login y navegar hacia ella antes de que comience cada prueba
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        await loginPage.navigate('https://www.saucedemo.com');
        await loginPage.login('standard_user', 'secret_sauce');
        await productsPage.addProductToCart('Sauce Labs Backpack');
    });  

    test('Verifica que al hacer clic en el ícono del carrito navega a la página "Your Cart"', async ({ page }) => {
        await page.click(productsElements.cartIcon);
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    });     
    test('US6. Verifica que el producto añadido aparece en el carrito', async ({ page }) => {
        await page.click(productsElements.cartIcon);
        let cartItems = await cartPage.getCartItems(); 
        expect(cartItems).toContain('Sauce Labs Backpack'); // Pasará porque el producto está en el array
        
    }); 
    
    test('US6. Verifica que el producto ya no está en el carrito', async ({ page }) => {
        await page.click(productsElements.cartIcon);
        await cartPage.removeProductFromCart('Sauce Labs Backpack');
        let cartItems = await cartPage.getCartItems(); 
        expect(cartItems).not.toContain('Sauce Labs Backpack'); // Pasará porque el producto está en el array
        
    });
});