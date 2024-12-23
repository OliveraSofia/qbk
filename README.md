## Project: E2E Testing for E-Commerce Demo

## Description:

This project includes end-to-end automated tests for a demonstration of a shopping flow in an e-commerce application. 

These tests are part of a demo for a client, focusing on the most important user flows. Please note that due to time constraints, the implementation may not reflect the best practices for reusability and scalability. With more time, additional refinements and reusable methods could have been incorporated.

## System Requirements:

 Node.js (version >= 16.x)
 Playwright (installed as a project dependency) version: 1.49.1


### Test Cases:

1. Login using any of the credentials provided. 
2. Test the invalid login flow. 
3. On the Products page, verify products can be added/removed to the Cart 
4. On the Products page, verify products can be sorted by Name and Price 
5. On the Products page, verify that product detail page can be reached by clicking on either the product name or product image 
6. On the Your Cart page, verify that products can be removed from the cart. 
7. On the Checkout: Your Information page, verify that all fields are required. 
8. On the Checkout: Overview page, verify that the Item Total amount is correct for the Products selected 
9. Confirm order checkout can be completed. 
10. Logout of the site 

## Clone and Installation

### Clone repository:
```
 $ git clone <repository-url>
 $ cd <repository-name>
```
### Install dependencies:

```
 $ npm install
```

## Running Tests

Run all tests with the following command:
```
 $ npx playwright test
```
To run specific tests, use:
```
 $ npx playwright test  <module-name> (Ex: npx playwright test product)
```
To open last HTML report run:
```
 $ npx playwright show-report
```

