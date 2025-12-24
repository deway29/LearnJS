const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');

const LoginPage = require('../pages/login');
const InventoryPage = require('../pages/sort');
const CartPage = require('../pages/cart');
const CheckoutPage = require('../pages/checkout');

const visualCompare = require('../utils/visualTest');
const takeScreenshot = require('../utils/screenshot');

const fs = require('fs');
const path = require('path');

// ================= HOOK FUNCTION =================

async function beforeHook() {
    const driver = await new Builder()
        .forBrowser('firefox')
        .build();

    await driver.get('https://www.saucedemo.com/');
    console.log("HOOK BEFORE: Browser dibuka & website terbuka");

    return driver;
}

async function afterHook(driver, testStatus) {
    if (testStatus === 'failed') {
        // ORIGINAL ERROR SCREENSHOT (WAJIB ADA)
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync('error_screenshot.png', screenshot, 'base64');
        console.log("HOOK AFTER: Screenshot diambil karena test gagal");

        // SCREENSHOT NORMAL VIEWPORT
        await takeScreenshot(driver, 'FAILED.png');
    }

    await driver.quit();
    console.log("HOOK AFTER: Browser ditutup");
}

// ================= MOCHA TEST =================

describe('Saucedemo End-to-End Automation', function () {
    this.timeout(60000);

    let driver;
    let testStatus = 'passed';

    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    before(async function () {
        driver = await beforeHook();

        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
    });

    after(async function () {
        await afterHook(driver, testStatus);
    });

    it('Login sukses, sort produk Z-A, checkout berhasil + visual test', async function () {
        try {
            // ===== LOGIN =====
            await loginPage.login('standard_user', 'secret_sauce');
            expect(await loginPage.isLoginSuccess()).to.be.true;
            console.log("Assertion passed: Login berhasil!");

            // ===== SORT =====
            await inventoryPage.sortZtoA();

            // ===== ADD TO CART =====
            await cartPage.addProductToCart();
            await cartPage.goToCart();
            await cartPage.clickCheckout();

            // ===== CHECKOUT =====
            await checkoutPage.fillCheckoutInfo();
            await checkoutPage.finishCheckout();

            // ===== ASSERT CHECKOUT =====
            const successMsg = await checkoutPage.getSuccessMessage();
            expect(successMsg).to.equal("Thank you for your order!");
            console.log("Assertion passed: Checkout berhasil!");

            // ===== SCREENSHOT (NORMAL VIEWPORT) =====
            const actualImagePath = await takeScreenshot(
                driver,
                'checkout_success.png'
            );

            // ===== VISUAL TESTING =====
            const diff = await visualCompare(
                path.resolve(__dirname, '../baseline/checkout_complete.png'),
                actualImagePath,
                path.resolve(__dirname, '../diff_checkout.png')
            );

            expect(diff).to.equal(0);
            console.log("Visual Test Passed");

        } catch (error) {
            testStatus = 'failed';
            throw error;
        }
    });
});
