const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;

        // ===== LOCATOR =====
        this.usernameInput = By.xpath("//input[@id='user-name']");
        this.passwordInput = By.xpath("//input[@id='password']");
        this.loginButton   = By.xpath("//input[@id='login-button']");
        this.inventoryList = By.xpath("//div[@class='inventory_list']");
    }

    // ===== ACTION =====
    async login(username, password) {
        await this.driver.wait(
            until.elementLocated(this.usernameInput),
            10000
        );

        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    // ===== VERIFICATION (tanpa assertion) =====
    async isLoginSuccess() {
        const inventory = await this.driver.wait(
            until.elementLocated(this.inventoryList),
            10000
        );
        return await inventory.isDisplayed();
    }
}

module.exports = LoginPage;