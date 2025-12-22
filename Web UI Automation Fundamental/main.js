const { Builder } = require('selenium-webdriver');
const login = require('./login');
const sortProductZtoA = require('./sort');
const fs = require('fs');

// ================= HOOK FUNCTION =================

// BEFORE HOOK
async function beforeHook() {
    const driver = await new Builder()
        .forBrowser('firefox')
        .build();

    await driver.get('https://www.saucedemo.com/');
    console.log("HOOK BEFORE: Browser dibuka & website terbuka");

    return driver;
}

// AFTER HOOK
async function afterHook(driver, testStatus) {
    if (testStatus === 'failed') {
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync('error_screenshot.png', screenshot, 'base64');
        console.log("HOOK AFTER: Screenshot diambil karena test gagal");
    }

    await driver.quit();
    console.log("HOOK AFTER: Browser ditutup");
}

// ================= MAIN TEST =================

(async function main() {
    let driver;
    let testStatus = 'passed';

    try {
        // 🔹 BEFORE HOOK
        driver = await beforeHook();

        // 🔹 TEST STEP
        await login(driver, 'standard_user', 'secret_sauce');
        await driver.sleep(1500);

        await sortProductZtoA(driver);
        await driver.sleep(1000);

    } catch (error) {
        testStatus = 'failed';
        console.error("TEST FAILED:", error);

    } finally {
        // 🔹 AFTER HOOK
        if (driver) {
            await afterHook(driver, testStatus);
        }
    }
})();
