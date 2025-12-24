const { By, until } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;

        this.firstName = By.id("first-name");
        this.lastName = By.id("last-name");
        this.postalCode = By.id("postal-code");
        this.continueBtn = By.id("continue");
        this.finishBtn = By.id("finish");
        this.completeHeader = By.className("complete-header");

        // Page identity
        this.checkoutTitle = By.className("title"); // "Checkout: Your Information"
    }

    async waitCheckoutPageLoaded() {
        const title = await this.driver.wait(
            until.elementLocated(this.checkoutTitle),
            10000
        );
        await this.driver.wait(until.elementIsVisible(title), 10000);
    }

    async fillCheckoutInfo() {
        await this.waitCheckoutPageLoaded();

        await this.driver.findElement(this.firstName).sendKeys("Dede");
        await this.driver.findElement(this.lastName).sendKeys("QA");
        await this.driver.findElement(this.postalCode).sendKeys("12345");
        await this.driver.findElement(this.continueBtn).click();
    }

    async finishCheckout() {
        await this.driver.wait(until.elementLocated(this.finishBtn), 10000);
        await this.driver.findElement(this.finishBtn).click();
    }

    async getSuccessMessage() {
        const header = await this.driver.wait(
            until.elementLocated(this.completeHeader),
            10000
        );
        return await header.getText();
    }
}

module.exports = CheckoutPage;
