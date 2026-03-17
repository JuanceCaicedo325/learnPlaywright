const {test, expect} = require('@playwright/test');

test('Child windows handling', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents']");

    const [newPage] = await Promise.all( //Promise.all is used to handle multiple asynchronous operations concurrently. In this case, it waits for both the new page event and the click action to complete before proceeding.
    [
        context.waitForEvent('page'), //listen for new page event
        documentLink.click(), //new page is opened
    ]);

    const text = await newPage.locator("p[class='im-para red']").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    
    await userName.fill(domain); //goes back to the first tab and enter the domain in the username field

    //await page.pause();
});