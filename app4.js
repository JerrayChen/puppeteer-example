// Run a test

const puppeteer = require('puppeteer');

async function takeThings(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      });

    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36');

    await page.goto('https://www.blackriflecoffee.com/');
    await page.waitFor(3000);

    await page.addScriptTag({url: "https://code.jquery.com/jquery-3.5.1.min.js"})

    await page.screenshot({path: 'blackriflecoffee.png'})

    await page.click('#hs-eu-confirmation-button');
    await page.click('.navigation__search-toggle');
    await page.waitFor(1000);
    await page.keyboard.type('Just Black Coffee Roast');
    await page.keyboard.press('Enter');
    await page.waitFor(3000)

    await page.click('.product-tile__description > span > a')
    await page.waitFor(3000)

    let coffee = await page.evaluate(function(){
        let price = $('#ProductPrice').text()
        let title = $('h1[itemprop="name"]').text()

        let product = {price, title}

        return product;
    })

    if (coffee.title === "Just Black Coffee Roast" && coffee.price === "$12.50"){
        console.log('Product is working correctly!')
    } else {
        console.log('Something is wrong with this product:')
        console.log(coffee)
    }

    await browser.close();
}

takeThings();