// Get product prices
const express = require('express')
const app = express()
const puppeteer = require('puppeteer');
const SERVER_PORT = 4001
const cron = require('node-cron');

async function takeThings(searchTerm){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      });

    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36');

    await page.goto('https://www.bestbuy.com/site/apple-airpods-with-wireless-charging-case-latest-model-white/6083595.p?skuId=6083595');
    await page.waitFor(20000);

    await page.addScriptTag({url: "https://code.jquery.com/jquery-3.5.1.min.js"})

    let products = []

    let result = await page.evaluate(function(){
        let product = {
            title: $('.sku-title').text(),
            price: $('.priceView-hero-price > span').first().text()
        }
        return product
    })

    products.push(result)

    let array = ["AirPods with Charging Case. Available", "AirPods Pro. Available"]

    // $('a[aria-label="AirPods with Charging Case. Available"]')

    for (let i = 0; i < array.length; i++){
        await page.click(`a[aria-label="` + array[i] + `"]`)
        await page.waitFor(3000)
        await page.addScriptTag({url: "https://code.jquery.com/jquery-3.5.1.min.js"})

        result = await page.evaluate(function(){
            let product = {
                title: $('.sku-title').text(),
                price: $('.priceView-hero-price > span').first().text()
            }
            return product;
        })

        products.push(result);
    }

    console.log(products);

    await browser.close();
}

takeThings();

cron.schedule('*/30 * * * *', () => {
    takeThings();

    // comparison of airpods old price to new price

    // send text or email if different
})

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))