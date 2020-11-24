const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrape(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    let news =  await page.evaluate(() => {
        let titleList = document.querySelectorAll(".title_3EhHc");
        let newsArr = [];
    
        for(let i = 0; i < titleList.length; i++){
            newsArr[i] = {
                title: titleList[i].innerText.trim(),
                summary: titleList[i].nextElementSibling.innerText.trim()
            };
        };
        return newsArr;
    });
    
    fs.writeFile("./xgbscrape.json", JSON.stringify(news, null, 3), (err) => {
        if(err){
            console.error(err);
            return;
        };
        console.log("Great Success");
    });

    browser.close();
}

scrape("https://xuangubao.cn/live");