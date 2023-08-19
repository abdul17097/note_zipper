const puppeteer = require("puppeteer");

async function runPuppeteer() {
  try {
    // Launch the browser with the new Headless mode
    const browser = await puppeteer.launch({
      headless: false,
    });

    // Create a new page
    const page = await browser.newPage();
    // Navigate to a website
    await page.goto("https://internxt.com/temporary-email");
    await page.waitForTimeout(4000);



    // Get email Placeholder
    const search = await page.waitForSelector("body > div > div > section > div > div > div > div > div > p " ,{timeout : 60000});
    let internxtEmail;
    let apiKeyText;
    // if (search) {
      // If the element is found, extract its inner text
      internxtEmail = await page.evaluate(
        (element) => element.innerHTML,
        search
      );
      console.log(internxtEmail);
      const dreamStudio = await browser.newPage();
      await dreamStudio.goto("https://dreamstudio.ai");
      // await dreamStudio.waitForNavigation({ waitUntil: "domcontentloaded" });

      //   Get Started Button
      const getStartedBtn = await dreamStudio.waitForSelector(
        "body > div > div > div > div > div > div > div > div > div > a"
      );
      // if (getStartedBtn) {
        await dreamStudio.waitForTimeout(4000);
        await getStartedBtn.click();
        await dreamStudio.waitForTimeout(10000);
        // Check popover and click remove button
        const popOverRemoveBtn = await dreamStudio.waitForSelector(
          'body > div > div > div > div > div > button > svg'
        );
        // if (popOverRemoveBtn) {
          // await dreamStudio.waitForTimeout(5000);
          // await dreamStudio.waitForTimeout(20000);

          await utilityBtnFun(dreamStudio, popOverRemoveBtn,3000);
          // Click Checkbox
          const checkBox = await dreamStudio.waitForSelector("body > div > div > div > div > div");
          // if (checkBox) {
            await utilityBtnFun(dreamStudio, checkBox ,3000);

            // Accept Button
            const acceptBtn = await dreamStudio.waitForSelector("body > div > div > div > div > div > button");
            // if (acceptBtn) {
              await dreamStudio.waitForTimeout(2000);
              await utilityBtnFun(dreamStudio, acceptBtn ,4000);

              // Click Login Button
              const loginBtn = await dreamStudio.waitForSelector("body > div > div > nav > div > button");
              // if (loginBtn) {
                await utilityBtnFun(dreamStudio, loginBtn ,4000);

                // Click Sign up Buttony
                const signuoBtn = await dreamStudio.waitForSelector('p.c74028152 > a');
                // if(signuoBtn){
                  await dreamStudio.waitForTimeout(4000);

                  await utilityBtnFun(dreamStudio, signuoBtn ,2000);

                    // Enter Email
                    const email = await dreamStudio.waitForSelector('body > div > main > section > div > div > div > form > div > div > div > div > div > input ');
                    // if(email){
                        await email.type(internxtEmail)
                        await dreamStudio.waitForTimeout(1000);
                        // Enter Password
                        // const password = await dreamStudio.$('body > div > main > section > div > div > div > form > div > input ')
                        const password = await dreamStudio.waitForSelector('input[name="password"]');
                        // if(password){
                        //   // const innerTextss = await password.evaluate(element => element);
                        //   // console.log("fgdsf dsfg");
                          await password.type(generateRandomPassword())

                        // Submit
                        const submitButton = await dreamStudio.waitForSelector('button[type="submit"]');
                        await submitButton.click();
                        await dreamStudio.waitForTimeout(2000);

                      // Second Checkbox
                      const secondCheckBox = await dreamStudio.waitForSelector("body > div > div > div > div > div");
                      await utilityBtnFun(dreamStudio, secondCheckBox ,2000);

                      // Second Accept Button
                      const secondAcceptBtn = await dreamStudio.waitForSelector("body > div > div > div > div > div > button");
                        await dreamStudio.waitForTimeout(2000);
                        await utilityBtnFun(dreamStudio, secondAcceptBtn ,2000);


                      // Create a new page
                      const page2 = await browser.newPage();
                      // Navigate to a website
                      await page2.goto("https://internxt.com/temporary-email");
                      await page2.waitForTimeout(4000);  
                      
                      //Refreash Button
                      const refreshBtn = await page2.waitForSelector("body > div > div > section > div > div > div > div > div > svg");
                      await utilityBtnFun(page2, refreshBtn, 3000); 
                      // Inbox Button
                      const inboxBtn = await page2.waitForSelector('body > div > div > section > div > div > div > div > div > button');
                      await utilityBtnFun(page2, inboxBtn, 5000); 

                      // Click Anchor Tag
                      const anchorElement = await page2.waitForSelector('div.main > p > a');
                      await utilityBtnFun(page2, anchorElement, 2000); 

                      // Create a new page
                      const page3 = await browser.newPage();
                      // Navigate to a website
                      await page3.goto("https://dreamstudio.ai/generate");
                      await page3.waitForTimeout(4000);  
                      
                      //checkbox 3
                      const checkBox3 = await page3.waitForSelector("body > div > div > div > div > div");
                      await utilityBtnFun(page3, checkBox3, 2000); 

                      //accept button 3
                      const acceptBtn3 = await page3.waitForSelector("body > div > div > div > div > div > button");
                      await utilityBtnFun(page3, acceptBtn3, 4000); 

                      // Click Login Button
                      const loginBtn2 = await page3.waitForSelector("body > div > div > nav > div > button");
                      await utilityBtnFun(page3, loginBtn2 ,4000);

                      // Accept Button 3
                      const acceptBtn4 = await page3.waitForSelector("button.c9f67a967");
                      await utilityBtnFun(page3, acceptBtn4, 4000);

                       //checkbox 4
                       const checkBox4 = await page3.waitForSelector("body > div > div > div > div > div");
                       await utilityBtnFun(page3, checkBox4, 2000); 
 
                       //accept button 5
                       const acceptBtn5 = await page3.waitForSelector("body > div > div > div > div > div > button");
                       await utilityBtnFun(page3, acceptBtn5, 4000); 

                      // Person Icon
                      const personIcon = await page3.waitForSelector("div.ml-1 > div > svg");
                      await utilityBtnFun(page3, personIcon, 4000);

                      // show api key
                      const eysBtn = await page3.waitForSelector("body > div > div > div > div > div > div > div > div > div > div > div > div.justify-end > button")
                      await utilityBtnFun(page3, eysBtn, 4000);

                      // Confirm Button
                      const confirmBtn = await page3.waitForSelector("div > div > div > button.shadow-brand-500-md");
                      await utilityBtnFun(page3, confirmBtn, 4000);
                      
                      // copy api key
                      const apiKeyBtn = await page3.waitForSelector("div.rounded > div > div > div > div.truncate");
                      apiKeyText = await page3.evaluate(
                        (element) => element.innerText,
                        apiKeyBtn
                      );
                      console.log(apiKeyText);

                      await page3.waitForTimeout(2000000);
                      
    // Close the browser instance
    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Call the Puppeteer function
runPuppeteer();

function generateRandomPassword() {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?"

  const allCharacters =
    uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

  let password = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters.charAt(randomIndex);
  }

  return password;
}

// setIntervel
async function helperFun(confirmation,data){
  const timeInterval =  setInterval(async()=>{
    if(!confirmation){
      clearInterval(timeInterval)
    }else{
      await data
    }
  },1000)
}

async function utilityBtnFun(dreamStudio, btnName,time){
  if(btnName){
    await btnName.click();
    await dreamStudio.waitForTimeout(time);
  }else{
    utilityBtnFun(dreamStudio,btnName,time)
  }
}