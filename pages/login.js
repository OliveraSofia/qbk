import loginElements from '../elements/login';

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.page.fill(loginElements.usernameInput, username);
    await this.page.fill(loginElements.passwordInput, password);
    await this.page.click(loginElements.loginButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(loginElements.errorMessage);
  }
}

export default LoginPage;
