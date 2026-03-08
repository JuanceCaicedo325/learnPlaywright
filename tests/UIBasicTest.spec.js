const {test, expect} = require('@playwright/test');

test.skip('Browser context playwright test', async ({browser})=> { // Browser fixture is only needed if I want to set cookies or plugins

    // Chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://google.com");
});

test('Page playwright test', async ({page})=> { // I can directly use page fixture if I don't want to set cookies or plugins

    const userName = page.locator("input[name='username']"); //These will be part of the page object model later on
    const password = page.locator("input[name='password']");
    const termsCheckBox = page.locator("input[id='terms']");
    const signInBtn = page.locator("input[id='signInBtn']");
    const errorMsg = page.locator("[style*='block']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill("rahul");
    await password.fill("Learning@830$3mK2)");

    await termsCheckBox.click();
    await signInBtn.click();

    console.log(await errorMsg.textContent());
    await expect(errorMsg).toContainText("Incorrect username/password.");

    await userName.fill("rahulshettyacademy");
    await signInBtn.click();

    await expect(page).toHaveTitle("ProtoCommerce");
    await expect(page.locator("[class='card-title']")).toBeVisible();
});