import cartElements from '../elements/cart';
import checkoutElements from '../elements/checkout';
import chcheckoutElements from '../elements/checkout'

class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToOverviewPage() {
    await this.page.click(chcheckoutElements.continueButton); 
    await this.page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');

  }

    // Método para llenar los campos de información del Checkout
    async fillCheckoutInformation(firstName, lastName, zipCode) {
      await this.page.fill(checkoutElements.firstNameInput, firstName);
      await this.page.fill(checkoutElements.lastNameInput, lastName);
      await this.page.fill(chcheckoutElements.postalCodeInput, zipCode);
      await this.page.click(chcheckoutElements.continueButton);
    }

  // Método para obtener los precios de los items del carrito
  async getSelectedProductPrices() {
    return await this.page.$$eval(checkoutElements.inventoryItemPrice, (items) =>
      items.map((item) => parseFloat(item.textContent.replace('$', '').trim()))
    );
  }

  // Método para obtener el impuesto
  async getTax() {
    const taxText = await this.page.textContent(checkoutElements.taxPrice);
    return parseFloat(taxText.replace('Tax: $', '').trim());
  }

  // Método para obtener el total mostrado
  async getDisplayedTotal() {
    const totalText = await this.page.textContent(checkoutElements.totalPrice);
    return parseFloat(totalText.replace('Total: $', '').trim());
  }

  async completeOrder() {
    await this.page.click(chcheckoutElements.finishButton); // Botón para finalizar
    await this.page.waitForURL('https://www.saucedemo.com/checkout-complete.html'); // URL de la confirmación
  }

  async getSuccessMessage() {
    return await this.page.textContent(chcheckoutElements.completeMessage);
  }

  async logout() {
    // Abrir el menú emergente
    await this.page.click(cartElements.burguerMenu);
    
    // Esperar a que el menú esté visible
    await this.page.waitForSelector(cartElements.sidebarMenu, { state: 'visible' });
  
    // Hacer clic en el botón de logout
    await this.page.click(cartElements.sedeBarLogoutLink);
  }
}
export default CheckoutPage;
