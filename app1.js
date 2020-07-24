// Get the title and bio from a wikipedia article

const puppeteer = require('puppeteer');

async function takeThings(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://en.wikipedia.org/wiki/Randy_Savage');

    await page.waitFor(20000);

    let machoMan = await page.evaluate(function(){
        let header = $('#firstHeading').text()
        let bio = $('.mw-parser-output > p').text()
        bio = bio.slice(0, 277) + '...'
        return bio
    })

    console.log(machoMan);

    await browser.close();
}

takeThings();