const { Builder } = require('selenium-webdriver');
const login = require('../login');
const sortProductZtoA = require('../sort');
const { describe, it, before, after } = require('mocha');

describe('SauceDemo Web UI Automation', function() {
    this.timeout(30000); // timeout Selenium
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.get('https://www.saucedemo.com/');
        console.log("Website Saucedemo terbuka.");
    });

    after(async () => {
        await driver.quit();
        console.log("Browser ditutup.");
    });

    it('Login berhasil', async () => {
        await login(driver, 'standard_user', 'secret_sauce');
        await driver.sleep(1500); // delay manusiawi
    });

    it('Sort produk Z-A berhasil', async () => {
        await sortProductZtoA(driver);
        await driver.sleep(1000);
    });
});
