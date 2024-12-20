const cartElements = {
    cardItemTitle : '[data-test="inventory-item-name"]',
    productRemoveButton : (productName) =>`[data-test="remove-${productName}"]`
  };
  
  export default cartElements;