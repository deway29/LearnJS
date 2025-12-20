const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');

async function login(driver, username, password) {
    // Tunggu input username muncul
    await driver.wait(until.elementLocated(By.xpath("//input[@id='user-name']")), 10000);

    // Input username
    await driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys(username);

    // Input password
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys(password);

    // Klik tombol login
    await driver.findElement(By.xpath("//input[@id='login-button']")).click();

    // Tunggu halaman produk muncul
    const inventoryList = await driver.wait(
        until.elementLocated(By.xpath("//div[@class='inventory_list']")),
        10000
    );

    // Assertion login
    const isDisplayed = await inventoryList.isDisplayed();
    expect(isDisplayed).to.be.true;
    console.log("Assertion passed: Login berhasil!");
}

module.exports = login;
