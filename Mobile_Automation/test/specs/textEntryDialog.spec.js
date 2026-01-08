const action = require('../action/textEntryDialog.action');
const fs = require('fs');
const path = require('path');

describe('API Demos - Text Entry Dialog', () => {

    it('should input and verify name & password', async () => {
        await action.openTextEntryDialog();
        await action.fillTextEntry('dede', '12345');

        // reopen dialog untuk verifikasi
        await action.reopenTextEntryDialog();
        await action.verifyTextEntry('dede', '12345');
    });

    afterEach(async () => {
        const dir = path.join(process.cwd(), 'screenshots');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        const filePath = path.join(dir, `${Date.now()}.png`);
        await browser.saveScreenshot(filePath);
    });
});
