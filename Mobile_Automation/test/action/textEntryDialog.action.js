const page = require('../pageobjects/textEntryDialog.page');
const { expect } = require('chai');

class TextEntryDialogAction {

    async openTextEntryDialog() {
        await page.appMenu.click();
        await page.alertDialogsMenu.click();
        await page.textEntryDialogMenu.click();
    }

    async fillTextEntry(name, password) {
        await page.nameField.waitForDisplayed();
        await page.nameField.setValue(name);
        await page.passwordField.setValue(password);
        await page.okButton.click();
    }

    async reopenTextEntryDialog() {
        await page.textEntryDialogMenu.click();
    }

    async verifyTextEntry(name, password) {
        await page.nameField.waitForDisplayed();

        const actualName = await page.nameField.getText();
        const actualPassword = await page.passwordField.getText();

        expect(actualName).to.equal(name);
        expect(actualPassword.length).to.equal(password.length);
    }
}

module.exports = new TextEntryDialogAction();
