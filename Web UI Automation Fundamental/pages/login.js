const { By, until } = require('selenium-webdriver');
const takeScreenshot = require('../utils/screenshot'); 

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

        // ===== SCREENSHOT SETELAH LOGIN =====
        await takeScreenshot(this.driver, 'login_page.png');
    }

    // ===== VERIFICATION (tanpa assertion) =====
    async isLoginSuccess() {
        const inventory = await this.driver.wait(
            until.elementLocated(this.inventoryList),
            10000
        );

    // Screenshot halaman inventory setelah login berhasil
    await takeScreenshot(this.driver, 'inventory_page.png');

        return await inventory.isDisplayed();
    }
}

module.exports = LoginPage;