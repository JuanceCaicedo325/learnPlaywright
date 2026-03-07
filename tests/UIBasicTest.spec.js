const {test} = require('@playwright/test');

test('Browser context playwright test', async ({browser})=> { // Browser fixture is only needed if I want to set cookies or plugins

    // Chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test('Page playwright test', async ({page})=> { // I can directly use page fixture if I don't want to set cookies or plugins

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});