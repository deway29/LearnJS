const { By, until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;

        this.addToCartBtn = By.xpath("//button[contains(text(),'Add to cart')][1]");
        this.cartIcon = By.className("shopping_cart_link");
        this.checkoutBtn = By.id("checkout");

        // Page identity (penting!)
        this.pageTitle = By.className("title"); // "Your Cart"
    }

    async addProductToCart() {
        await this.driver.wait(until.elementLocated(this.addToCartBtn), 10000);
        await this.driver.findElement(this.addToCartBtn).click();
    }

    async goToCart() {
        await this.driver.findElement(this.cartIcon).click();
        await this.waitCartPageLoaded();
    }

    async waitCartPageLoaded() {
        const title = await this.driver.wait(
            until.elementLocated(this.pageTitle),
            10000
        );
        await this.driver.wait(until.elementIsVisible(title), 10000);
    }

    async clickCheckout() {
        await this.driver.wait(until.elementLocated(this.checkoutBtn), 10000);
        await this.driver.findElement(this.checkoutBtn).click();
    }
}

module.exports = CartPage;
