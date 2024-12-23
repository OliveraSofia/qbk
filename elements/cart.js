const cartElements = {
    cardItemTitle : '[data-test="inventory-item-name"]',
    productRemoveButton : (productName) =>`[data-test="remove-${productName}"]`,
    checkoutButton : '[data-test="checkout"]',
    burguerMenu :'#react-burger-menu-btn',
    sidebarMenu : '[data-test="logout-sidebar-link"]',
    sedeBarLogoutLink: '[data-test="logout-sidebar-link"]'
  };
  
  export default cartElements;