class TextEntryDialogPage {

    // MENU
    get appMenu() {
        return $('//android.widget.TextView[@content-desc="App"]');
    }

    get alertDialogsMenu() {
        return $('//android.widget.TextView[@content-desc="Alert Dialogs"]');
    }

    get textEntryDialogMenu() {
        return $('//android.widget.Button[@content-desc="Text Entry dialog"]');
    }

    // INPUT FIELD
    get nameField() {
        return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]');
    }

    get passwordField() {
        return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]');
    }

    // BUTTON
    get okButton() {
        return $('//android.widget.Button[@resource-id="android:id/button1"]');
    }
}

module.exports = new TextEntryDialogPage();


