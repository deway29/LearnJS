const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');

async function sortProductZtoA(driver) {
    // Tunggu inventory list muncul
    await driver.wait(until.elementLocated(By.xpath("//div[@class='inventory_list']")), 10000);

    // Klik dropdown menu
    const dropdown = await driver.findElement(By.xpath("//select[@class='product_sort_container']"));
    await driver.wait(until.elementIsVisible(dropdown), 5000);
    await dropdown.click();
    await driver.sleep(500);

    // Pilih opsi Z-A
    const optionZA = await driver.findElement(By.xpath("//option[@value='za']"));
    await optionZA.click();
    await driver.sleep(1000);

    // Tunggu produk tertentu muncul
    const lastProduct = await driver.wait(
        until.elementLocated(By.xpath("//div[normalize-space()='Test.allTheThings() T-Shirt (Red)']")),
        10000
    );

    // Assertion sort
    const productText = await lastProduct.getText();
    expect(productText).to.equal("Test.allTheThings() T-Shirt (Red)");
    console.log("Assertion passed: Produk terakhir sesuai Z-A!");
}

module.exports = sortProductZtoA;
