import loginElements from '../elements/login';

class LoginPage {  // Clase que representa la página de login en la aplicación.
  constructor(page) {
    this.page = page;  // Instancia de la página para interactuar con los elementos
  }
  
  // Metodo que abre la pagina
  async navigate(URL) {
    await this.page.goto(URL);
  }
  // Methodo para ingresar credenciales e ingresar en el portal
  async login(username, password) {
    await this.page.fill(loginElements.usernameInput, username);
    await this.page.fill(loginElements.passwordInput, password);
    await this.page.click(loginElements.loginButton);
  }
  // Metodo para verificar el mensaje de error ante una credenciales incorrectas
  async getErrorMessage() {
    return await this.page.textContent(loginElements.errorMessage);
  }
}

export default LoginPage;
