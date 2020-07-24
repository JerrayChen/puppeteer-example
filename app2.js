// Get product prices

const puppeteer = require('puppeteer');

async function takeThings(searchTerm){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://shop.harmonsgrocery.com/search?search_term=' + searchTerm);
    await page.waitFor(5000);

    await page.addScriptTag({url: "https://code.jquery.com/jquery-3.5.1.min.js"})

    let products = await page.evaluate(function(){
        let array = []

        $('.product-wrapper').each(function(){
            let product = {
                title: $(this).find('.cell-title-text').text(),
                size: $(this).find('.cell-product-size').text(),
                price: $(this).find('.css-0').text()
            }
            array.push(product)
        })

        return array
    })

    console.log(products)

    await browser.close();
}

takeThings('bacon');