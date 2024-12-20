import productsElements from '../elements/products';

class ProductsPage {  // Clase que representa la página de productos en la aplicación.
  constructor(page) {
    this.page = page; // Instancia de la página para interactuar con los elementos
  }

  // Methodo para Añadir un producto al carrito
  async addProductToCart(productName) {
    const lowerCaseName = productName.toLowerCase().replace(/\s+/g, '-'); // Convierte el texto del parametro en minusculas y lo separa con guiones para formar los locators.
    const selector = productsElements.productAddButton(lowerCaseName);
    await this.page.click(selector);
  }

  // Methodo para quitar un producto del carrito
  async removeProductFromCart(productName) {
    const lowerCaseName = productName.toLowerCase().replace(/\s+/g, '-'); // Convierte el texto del parametro en minusculas y lo separa con guiones para formar los locators.
    const selector = productsElements.productRemoveButton(lowerCaseName);
    await this.page.click(selector);
  }

  // Methodo para ir a los detalles de un producto a través del título
  async clickProductDetail(productName) {
    const selector = productsElements.productDetailLink(productName);
    await this.page.click(selector);
  }

  // Methodo para ir a los detalles de un producto a través de la imagen
  async clickProductImage(productName) {
    const lowerCaseName = productName.toLowerCase().replace(/\s+/g, '-'); 
    const selector = productsElements.productImage(lowerCaseName);
    await this.page.click(selector);
  }

  // Methodo para obtener el precio de un producto
  async getProductPrice(productName) {
    const lowerCaseName = productName.toLowerCase().replace(/\s+/g, '-'); 
    const selector = productsElements.productPrice(lowerCaseName);
    return await this.page.textContent(selector);
  }

  // Methodo para ordenar los productos usando el dropdown
  async sortProductsBy(option) {
    await this.page.waitForSelector(productsElements.sortDropdown, option);
  }

  // Methodo para verificar si el ícono del carrito es visible
  async isCartIconVisible() {
    return await this.page.isVisible(productsElements.cartIcon);
  }
  // Methodo para obtener el total de productos agregados al carrito de compras
  async getCartItemCount() {
    const cartCountSelector = productsElements.cartItemCount;
    if (await this.page.isVisible(cartCountSelector)) {
      const countText = await this.page.textContent(cartCountSelector);
      return parseInt(countText.trim(), 10);
    }
    return 0; // Si no está visible, el carrito está vacío
  }

  // Methodo para obtener el título del detalle del producto
async getProductDetailTitle(productName) {
  const selector = productsElements.productDetailLink(productName); 
  await this.page.click(selector); 
  await this.page.waitForSelector(productsElements.detailTitleSelector); 
  return await this.page.textContent(productsElements.detailTitleSelector);  
}
 // Methodo para obtener una lista de todos los precios y agregarlos en un array de números
async getProductPrices() {
  // Esperamos a que los precios estén visibles en la página
  const priceSelectors = await this.page.$$(productsElements.pricesList);

  // Extraemos el texto de cada precio y lo devolvemos como un array de números
  const prices = [];
  for (const priceSelector of priceSelectors) {
    const priceText = await priceSelector.textContent();  // Obtiene texto de cada elemento
    const priceValue = parseFloat(priceText.replace('$', '').trim());  // Limpia el texto y lo convierte en número
    prices.push(priceValue);
  }

  return prices;
}
// Obtener los nombres de todos los productos en la página
async getProductNames() {
  // Esperamos a que los nombres de los productos sean visibles
  const nameSelectors = await this.page.$$(productsElements.namesList);
  // Extraemos el texto de cada nombre y lo devolvemos como un array
  const names = [];
  for (const nameSelector of nameSelectors) {
    const nameText = await nameSelector.textContent();
    names.push(nameText.trim());  // Eliminamos espacios adicionales y lo añadimos al array
  }

  return names;
}


}

export default ProductsPage;
