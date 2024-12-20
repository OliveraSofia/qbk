const productsElements = {
    
    inventoryList_container: 'div[data-test="inventory-list"]',
  

    productAddButton: (productName) => `button[data-test="add-to-cart-${productName}"]`,
    productRemoveButton: (productName) => `button[data-test="remove-${productName}"]`,
    productDetailLink: (productName) => `a[data-test="item-${productName}-title-link"]`,
    productImage: (productName) => `img[data-test="inventory-item-${productName}-img"]`,
    productPrice: (productName) => `div[data-test="inventory-item-${productName}-price"]`,

    sortDropdown: 'select[data-test="product_sort_container"]',

    cartIcon: '#shopping_cart_container',
  };
  
  export default productsElements;
  