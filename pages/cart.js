import cartElements from '../elements/cart'

class CartPage {
    constructor(page) {
      this.page = page;
    }
  
    // Methodo para obtener los productos en el carrito y guardarlos en un array de texto
    async getCartItems() {
      const itemElements = await this.page.$$(cartElements.cardItemTitle); // Ajusta el selector al que corresponda para los nombres en el carrito
      // Extraemos el texto de cada nombre y lo devolvemos como un array
      const items = [];
      for (const itemElement of itemElements) {
        const itemName = await itemElement.textContent();
        items.push(itemName.trim()); // Eliminamos espacios adicionales y lo añadimos al array
      }

      return items;
    }
  
    // Methodo para remover un producto del carrito
    async removeProductFromCart(productName) {
      const lowerCaseName = productName.toLowerCase().replace(/\s+/g, '-');
      const selector = cartElements.productRemoveButton(lowerCaseName)
      await this.page.click(selector);
    }
  }

  export default CartPage;
  