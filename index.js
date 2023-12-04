
// Add in the dependencies here 
const puppeteer = require('puppeteer'); 

// const CronJob = require('cron').CronJob;

const nodeCron = require('node-cron'); 
const scrapy = require('scrapy'); // Import the scrapy module
const cssselect = require('css-select');

const url = 'https://facebook-daniel-wakeley-s-projects.vercel.app/'; 



let counter = 0; 
let links = []; 

let visitedProducts = []; 

async function configureBrowser(){

    const browser = await puppeteer.launch({headless: false});  // Create a new page
    const page = await browser.newPage(); 
    await page.goto(url); 

    return(page); 
    
}

async function cronJOB(){


    
    // Add in the cron job here 
    nodeCron.schedule('* */2 * * * *', async () => {
            
        getProduct(); 
        
    });

}

async function startCron(){
    
    // Call the function that contains the cron job here 
    cronJOB(); 
    
    
    
}




// Add in the goBack function here 
async function goBack(page){
    
    // Navigate back to the original product page here 
    await Promise.all([page.goto(url), page.waitForNavigation()]);
    console.log("*************???????????----------");
    console.log("this is the last part of the program")
    console.log("___________++++++=================");
    
    // Refresh the page here 
    await page.reload(); 
    
    
    // Call the function that starts the cron job here 
    //  await  startCron(); 
    
    // Add in a set timeout function here

    await getProduct(page); 
    

     
}



// Add in the Send Message function here 

async function sendMessage(page, messageURL){

    
    const profile_Link = 'https://discord.com/channels/@me/644645709781663744';
    
    console.log('this should be the page'); 
    console.log(page); 
    // Navigate here 
    await Promise.all([page.goto('https://discord.com/channels/@me/644645709781663744'), page.waitForNavigation()]);
    
    // Add in an await for select here 
    await page.waitForSelector('[role="textbox"]'); 
    
    const textBox = await page.$('[role="textbox"]');
    
    await textBox.click(); 
    
    await textBox.type(messageURL);
    
    // Press Enter here  
    await page.keyboard.press('Enter'); 
    
    // Call the goBack function here 
     await goBack(page); 
      goBack(page); 

}



async function login(page, messageURL){

        
        console.log('this is the page in the login function '); 
        console.log(page); 
        
        
    await page.waitForSelector('[name="email"]'); 
    await page.waitForSelector('[name="password"]');
    
    // Wait for the element to be available 
    const emailInput = await page.$('[name="email"]'); 
    const passwordInput = await page.$('[name="password"]');
    
    // Access the element 
    console.log("this is the email input "); 
    console.log(emailInput);
    
    console.log("this is the password input"); 
    console.log(passwordInput); 
    
    
    await emailInput.click(); 
    await emailInput.type("danielwakeley7@gmail.com");
    
    
    await passwordInput.click(); 
    await passwordInput.type("Beholdhowgood!133");
    
    await page.keyboard.press('Enter'); 
    await page.keyboard.press('Enter'); 
    await page.keyboard.press('Enter'); 
    await page.keyboard.press('Enter'); 
        
        function log(){
            
            console.log('logging'); 
        }
    

    setTimeout(() => {
        sendMessage(page, messageURL); 
    }, 9000);
    


}





// Add in the message boss function here 
async function messageBoss(page, messageURL){


    console.log('this is the page of the messageBoss function'); 
    console.log(page); 
    

    console.log('teleporting there *****');
    await Promise.all([page.goto('https://discord.com/channels/@me/644645709781663744'), page.waitForNavigation()]);
    login(page, messageURL); 
}



// Add in the evaluate data function here 
async function evaluateData(page, priceNum){

    console.log('this is the page of the evaluate function '); 
    console.log(page); 

    
    if(priceNum > 500 && priceNum < 90000 ){
        
        console.log("we have a high price!!!");
        console.log('this is the price');
        console.log(priceNum);
        const messageURL = await page.url();
        console.log('this is the message url'); 
        console.log(messageURL); 
        
        
        messageBoss(page,messageURL); 
    }

    else{

        console.log("low price"); 
        
    //    await goBack(); 
       
        
    }
    
    console.log("this is the evaluate function ")

}





// Add in the scrape data function here 

async function scrapeData(page){
    
    console.log("is this working");
    
    const xpath = "//div [starts-with (text (), '\u0024')]";
    
    const elements = await page.$x(xpath);
    
    const priceElement = elements[0]; 
    
    const priceText = await page.evaluate(el => el.textContent, priceElement); 
    const formattedText = priceText.replace(/[, $]/g, ''); 


    const priceNum = Number(formattedText); 
    
    console.log("this is the price number"); 
    console.log(priceNum); 
    
    // await priceElement.click(); 
    
    console.log("just about to run"); 
    

    evaluateData(page, priceNum); 
    // evaluateData(page); 
}


// Add in the current url function here 
async function currentURL(page){
        
    const currentUrl = await page.url();
    visitedProducts.push(currentUrl); 
    // console.log(currentUrl);
    console.log("is this functioning");
    

    scrapeData(page); 
}




async function getProduct(page, counter){

    // Refresh the page here 
    await page.reload(); 
    
    
    console.log("will this WORKKKK");
    let index = 3;
    
    await page.screenshot({path: 'facebook.png'});
    
    // Create the xpath expression here 
    // const xpath = "//div [matches (text (), '\u00A3')]";
    // const xpath = "//div [contains (text (), '\u00A3')]";
    const xpath = "//div [starts-with (text (), '\u0024')]";
    
    const elements = await page.$x(xpath);

    // Access the right element using the index variable here 
    if(elements.length >= 1){
    
        
        const element = elements[index]; 
        await element.click(); 
        
    }
    
    else{
        
        console.log("nothing has been assigned")
        
    }
    
    
    // Call the current url function here 
    currentURL(page); 
}





async function startProgram(){
    
    const page = await configureBrowser();

    // getProduct(page); 
    
    
    nodeCron.schedule('* */3 * * * *', async () => {
        
        getProduct(page); 

        
    });

}

startProgram(); 
