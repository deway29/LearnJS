# Mobile Automation - API Demos

## Tech Stack
- Appium
- WebdriverIO
- Node.js
- Allure Report

## Test Scenario
1. Launch APIDemos-debug.apk
2. Open App > Alert Dialogs > Text Entry Dialog
3. Input name and password
4. Verify name and password
5. Take screenshot on test result
6. Generate Allure Report

## How to Run
```bash
npm install
npx wdio run wdio.conf.js
