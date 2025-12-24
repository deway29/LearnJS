const { By, until } = require('selenium-webdriver');
const takeScreenshot = require('../utils/screenshot');

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

        // Screenshot setelah add to cart
        await takeScreenshot(this.driver, 'cart_add_product.png');
    }

    async goToCart() {
        await this.driver.findElement(this.cartIcon).click();
        await this.waitCartPageLoaded();

        // Screenshot halaman cart
        await takeScreenshot(this.driver, 'cart_page.png');
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

        // Screenshot sebelum checkout
        await takeScreenshot(this.driver, 'cart_checkout.png');
    }
}

module.exports = CartPage;
