const {test, expect} = require('@playwright/test');

test('End to End Test', async ({page}) => {

    const productName = "iphone 13 pro";

    const registerLink = page.getByText("Register here")
    const firstName = page.locator("input[id='firstName']");
    const lastName = page.locator("input[id='lastName']");
    const emailField = page.locator("input[id='userEmail']");
    const phoneNumber = page.locator("input[id='userMobile']");
    const occupation = page.locator("select[class*='select']");
    const genderBtn = page.locator("input[value='Male']");
    const password = page.locator("input[id='userPassword']");
    const confirmPassword = page.locator("input[id='confirmPassword']");
    const checkBox = page.locator("input[type='checkbox']");
    const registerBtn = page.locator("input[id='login']");
    const registerloginBtn = page.locator("button[class='btn btn-primary']");
    const toastMsg = page.locator("div#toast-container");
    const userEmail = page.locator("input[id='userEmail']");
    const userPassword = page.locator("input[id='userPassword']");
    const loginBtn = page.locator("input[id='login']");
    const products = page.locator(".card-body");
    const titles = page.locator(".card-body b");
    const blinkingText = page.locator("[href*='techsmarthire']");
    const cart = page.locator("[routerlink*='cart']");
    const checkoutBtn = page.locator("text=Checkout");
    const selectCountryBtn = page.locator("[placeholder*='Country']");
    const countryDropdown = page.locator(".ta-results");
    const shippingEmail = page.locator(".user__name [type='text']").first();
    const creditCardField = page.locator("input[value]");
    const placeOrderBtn = page.locator(".action__submit");
    const cvvField = page.locator("input[class='input txt']").first();
    const nameOnCardField = page.locator("input[class='input txt']").last();
    const couponField = page.locator("[name='coupon']");
    const applyCouponBtn = page.locator("[type='submit']");
    const thankYouMsg = page.locator(".hero-primary");
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    const ordersBtn = page.locator ("li [routerlink*='orders']");
    const ordersTable = page.locator("tbody");
    const orderIdRows = page.locator("tbody tr");
    const viewBtn = page.locator(".btn-primary");
    const orderSummaryId = page.locator("div .col-text");
    const thanksForShoppingMsg = page.locator("div .tagline");

    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await expect(page).toHaveTitle("Let's Shop"));

    await registerLink.click();
    
    await firstName.fill("Juan");
    await lastName.fill("Caicedo");

    const randomUsername = "user_" + Math.random().toString(36).substring(2, 10);
    const email = randomUsername + "@example.com";
    console.log("Generated email: " + email);
    await emailField.fill(email);

    await phoneNumber.fill("1234567890");
    await occupation.selectOption("2: Student");
    await genderBtn.check();
    await expect(genderBtn).toBeChecked();
    await password.fill("Password123!");
    await confirmPassword.fill("Password123!");
    await checkBox.check();
    await registerBtn.click();

    await expect(toastMsg).toHaveText("Registered Successfully");
    await registerloginBtn.click();

    await userEmail.fill(email);
    await userPassword.fill("Password123!");
    await loginBtn.click();

    await page.waitForLoadState('networkidle'); //is a bit flaky as of today 3/9/2026
    await products.first().waitFor();
    console.log("List of products: " + await titles.allTextContents());

    await expect(blinkingText).toHaveAttribute("class", "blinkingText");

    const count = await products.count();

    for(let i = 0; i < count; i++){

        if(await titles.nth(i).textContent() === productName){

            await products.nth(i).locator("text= Add To Cart").click();
            console.log("Selected product: " + productName);
            break;
        }
    }

    await cart.click();
    await page.locator("div li").first().waitFor(); //wait for the items to be visible in the cart

    //await page.locator("h3:has-text('iphone 13 pro')").isVisible();"iphone 13 pro"
    const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
    expect(bool).toBeTruthy();

    await checkoutBtn.click();

    await selectCountryBtn.pressSequentially("Col", {delay: 150}); //simulate typing "Col" with a delay of 150ms between each keystroke.
    await countryDropdown.waitFor();
    const countriesCount = await countryDropdown.locator("button").count();

    for(let i = 0; i < countriesCount; i++){

        const text = await countryDropdown.locator("button").nth(i).textContent();

        if(text === " Colombia"){

            await countryDropdown.locator("button").nth(i).click();
            console.log("Selected country: " + text);
            break;
        }
    }

    await expect(shippingEmail).toHaveText(email);

    const creditCardValue = await creditCardField.inputValue();
    expect(creditCardValue.length).toBe(19);
    await cvvField.fill("123");
    await nameOnCardField.fill(randomUsername);

    await couponField.fill("rahulshettyacademy");
    await applyCouponBtn.click();
    
    await placeOrderBtn.click();

    await expect(thankYouMsg).toHaveText("Thankyou for the order.");
    const orderIdText = await orderId.textContent();
    console.log("Order ID: " + orderIdText);

    await ordersBtn.click();

    await ordersTable.waitFor();

    for(let i = 0; i < await orderIdRows.count(); i++){

        const rowOrderId = await orderIdRows.nth(i).locator("th").textContent();

        if(orderIdText.includes(rowOrderId)){

            await orderIdRows.nth(i).locator(viewBtn).click();
            break;
        }
    }

    await orderSummaryId.waitFor();
    const orderSummaryIdText = await orderSummaryId.textContent();
    await expect(orderIdText.includes(orderSummaryIdText)).toBeTruthy();

    console.log(await thanksForShoppingMsg.textContent());

    await page.pause();
});