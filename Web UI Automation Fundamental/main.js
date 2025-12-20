const { Builder } = require('selenium-webdriver');
const login = require('./login');
const sortProductZtoA = require('./sort');

(async function main() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // 1. Buka website
        await driver.get('https://www.saucedemo.com/');
        console.log("Website Saucedemo terbuka.");

        // 2. Login
        await login(driver, 'standard_user', 'secret_sauce');
        await driver.sleep(1500); // delay 

        // 3. Sort produk Z-A sesuai skenario & assertion
        await sortProductZtoA(driver);
        await driver.sleep(1000); // delay sebelum tutup

    } catch (error) {
        console.error("Terjadi error:", error);
    } finally {
        // 4. Tutup browser
        await driver.quit();
        console.log("Browser ditutup.");
    }
})();
