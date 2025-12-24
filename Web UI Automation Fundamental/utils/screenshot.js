const fs = require('fs');

async function takeScreenshot(driver, fileName) {
    const image = await driver.takeScreenshot();
    fs.writeFileSync(fileName, image, 'base64');
    console.log(`Screenshot saved: ${fileName}`);
    return fileName; //WAJIB RETURN PATH
}

module.exports = takeScreenshot;
