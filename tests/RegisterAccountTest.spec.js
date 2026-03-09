const {test, expect} = require('@playwright/test');

test('Register account test', async ({page}) => {

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
    const firstItem = (page.locator("div[class*='card-body'] h5").first());

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
    await password.fill("Password123!");
    await confirmPassword.fill("Password123!");
    await checkBox.check();
    await registerBtn.click();

    expect(toastMsg).toHaveText("Registered Successfully");
    await registerloginBtn.click();

    await userEmail.fill("juan@example.com");
    await userPassword.fill("Password123!");
    await loginBtn.click();

    await expect(firstItem).toBeVisible();
    console.log("First item: " + await firstItem.textContent());
});