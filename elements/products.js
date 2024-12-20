const productsElements = {
    
    inventoryList: 'div[data-test="inventory-list"]',

    productAddButton: (productName) => `button[data-test="add-to-cart-${productName}"]`,
    productRemoveButton: (productName) => `button[data-test="remove-${productName}"]`,
    productDetailLink: (productName) => `div[data-test="inventory-item-name"]:has-text("${productName}")`,
    productImage: (productName) => `img[data-test="inventory-item-${productName}-img"]`,
    productPrice: (productName) => `div[data-test="inventory-item-${productName}-price"]`,
    
    sortDropdown: 'div[data-test="inventory-container"]',
    cartIcon: '[data-test="shopping-cart-link"]',
    cartItemCount: '.shopping_cart_badge',
    pricesList : '[data-test^="inventory-item"][data-test$="-price"]',
    namesList : '[data-test="inventory-item-name"]',
    detailTitleSelector : `div[data-test="inventory-item-name"]`
    
  };
  
  export default productsElements;
  