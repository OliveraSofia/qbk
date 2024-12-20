import productsElements from '../elements/products';

class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  // Añadir Sauce Labs Backpack al carrito
  async addProductToCart(productName) {
    const selector = productsElements.productAddButton(productName);
    await this.page.click(selector);
  }

  // Quitar un producto del carrito
  async removeProductFromCart(productName) {
    const selector = productsElements.productRemoveButton(productName);
    await this.page.click(selector);
  }

  // Visitar los detalles de un producto a través del título
  async visitProductDetail(productName) {
    const selector = productsElements.productDetailLink(productName);
    await this.page.click(selector);
  }

  // Hacer clic en la imagen del producto
  async clickProductImage(productName) {
    const selector = productsElements.productImage(productName);
    await this.page.click(selector);
  }

  // Obtener el precio de un producto
  async getProductPrice(productName) {
    const selector = productsElements.productPrice(productName);
    return await this.page.textContent(selector);
  }

  // Ordenar los productos usando el dropdown
  async sortProductsBy(option) {
    await this.page.selectOption(productsElements.sortDropdown, option);
  }

  // Verificar si el ícono del carrito es visible
  async isCartIconVisible() {
    return await this.page.isVisible(productsElements.cartIcon);
  }
}

export default ProductsPage;
