const { By, until } = require('selenium-webdriver');

class InventoryPage {
    constructor(driver) {
        this.driver = driver;

        // ===== LOCATOR =====
        this.inventoryList = By.xpath("//div[@class='inventory_list']");
        this.sortDropdown = By.xpath("//select[@class='product_sort_container']");
        this.optionZA = By.xpath("//option[@value='za']");
        this.lastProduct = By.xpath("//div[normalize-space()='Test.allTheThings() T-Shirt (Red)']");
    }

    // ===== ACTION =====
    async sortZtoA() {
        await this.driver.wait(
            until.elementLocated(this.inventoryList),
            10000
        );

        const dropdown = await this.driver.findElement(this.sortDropdown);
        await this.driver.wait(until.elementIsVisible(dropdown), 5000);
        await dropdown.click();
        await this.driver.sleep(500);

        const optionZA = await this.driver.findElement(this.optionZA);
        await optionZA.click();
        await this.driver.sleep(1000);
    }

    // ===== VERIFICATION (NO ASSERTION) =====
    async getLastProductText() {
        const product = await this.driver.wait(
            until.elementLocated(this.lastProduct),
            10000
        );
        return await product.getText();
    }
}

module.exports = InventoryPage;
