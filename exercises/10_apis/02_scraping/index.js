

const puppeteer = require('puppeteer')
const fs = require('fs')
const request = require('request')
//const csv = require('fast-csv')

const getRates = async query => {
	const width = 1920
	const height = 926
	const browser = await puppeteer.launch({ headless: false})
	const page = await browser.newPage()
	await page.setViewport({ width: width, height: height })
	await page.goto('https://www.amazon.co.uk/s/ref=sr_pg_1?keywords=javascript', { waitUntil: 'domcontentloaded' })
	await page.waitFor(5000)
	console.log('ready to grab page content')
	//const html = await page.content()
	let records
	const dom = await page.evaluate(() => {
		const elements = document.querySelectorAll('li#result_1 > div')
		records = elements.length
		// const hotels = []
		// elements.forEach((element) => {
		// 	const quoteJson = {}
		// 	try {
		// 		//quoteJson.quote = element.innerText.replace(/  +/g, ',')
		// 		quoteJson.country = element.querySelector('span.col:first-child').innerText
		// 		//quoteJson.currencyStr = element.querySelector('span.col:nth-child(2)').innerText
		// 		quoteJson.currency = element.querySelector('span.col:nth-child(2)').innerText.split(' (')[0]
		// 		quoteJson.code = element.querySelector('span.col:nth-child(2)').innerText.split(' (')[1].replace(')', '')
		// 		quoteJson.rate = parseFloat(element.querySelector('span.col:nth-child(3)').innerText)
		// 	} catch (err) {
		// 		return new Error('oops')
		// 	}
		// 	hotels.push(quoteJson)
		// })
		// return hotels
	})
	console.log(`found ${records} records`)
	await browser.close()
	return dom
}

const getCurrency = callback => getRates().catch(err => callback(err))

getCurrency( (err, data) => {
	if(err) console.log('oops!')
	console.log(`found ${data.length} CURRENCY codes`)
	console.log(data.length)
	fs.writeFileSync('currency.json', JSON.stringify(data, null, 2))
})

/*
https://www.amazon.co.uk/s/ref=sr_pg_2?rh=n%3A266239%2Ck%3Ajavascript&page=2&d=1&keywords=javascript&ie=UTF8&qid=1546457800

https://www.amazon.co.uk/s/ref=sr_pg_2?page=2&keywords=javascript

https://www.amazon.co.uk/s/ref=sr_pg_3?keywords=javascript

https://www.amazon.co.uk/JavaScript-Definitive-Guide-Guides/dp/0596805527/ref=sr_1_3?ie=UTF8&qid=1546457942&sr=8-3&keywords=javascript

simple search (note the number refers to the pagenation of the results):
https://www.amazon.co.uk/s/ref=sr_pg_1?keywords=javascript

uses the ISBN10 number:
https://www.amazon.co.uk/dp/0596805527

DOM EXTRACTION
use the Chrome plugin Element Locator.

li#result_1 > div > div:nth-of-type(2) > div > div:nth-of-type(2)
*/
