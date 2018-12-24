'use strict'

const puppeteer = require('puppeteer')
const fs = require('fs')
const request = require('request')
const csv = require('fast-csv')

const getRates = async query => {
	const width = 1920
	const height = 926
	const browser = await puppeteer.launch({ headless: false})
	const page = await browser.newPage()
	await page.setViewport({ width: width, height: height })
	await page.goto('https://www.travelex.co.uk/currency/exchange-rates', { waitUntil: 'domcontentloaded' })
	await page.waitFor(5000)
	try {
		await page.click('a#loadAll')
	} catch (error) {
		console.log('the loadAll button has already been clicked.')
	}
	console.log('ready to grab page content')
	//const html = await page.content()
	const dom = await page.evaluate(() => {
		const elements = document.querySelectorAll('div.row')
		console.log(`found ${elements.length} rows.`)
		const hotels = []
		elements.forEach((element) => {
			const quoteJson = {}
			try {
				//quoteJson.quote = element.innerText.replace(/  +/g, ',')
				quoteJson.country = element.querySelector('span.col:first-child').innerText
				//quoteJson.currencyStr = element.querySelector('span.col:nth-child(2)').innerText
				quoteJson.currency = element.querySelector('span.col:nth-child(2)').innerText.split(' (')[0]
				quoteJson.code = element.querySelector('span.col:nth-child(2)').innerText.split(' (')[1].replace(')', '')
				quoteJson.rate = parseFloat(element.querySelector('span.col:nth-child(3)').innerText)
			} catch (err) {
				return new Error('oops')
			}
			hotels.push(quoteJson)
		})
		return hotels
	})
	await browser.close()
	return dom
}

const getCurrency = callback => getRates().then(data => callback(null, data)).catch(err => callback(err))

getCurrency( (err, data) => {
	if(err) console.log('oops!')
	console.log(`found ${data.length} CURRENCY codes`)
	console.log(data.length)
	fs.writeFileSync('currency.json', JSON.stringify(data, null, 2))
})


const getCountries = callback => {
	const countryData = []
	csv.fromStream(request('https://datahub.io/core/country-list/r/0.csv'))
		.on('data', (data) => countryData.push({country: data[0], code: data[1]}))
		.on('end', () => callback(null, countryData))
}

getCountries( (err, data) => {
	if(err) console.log('oops!')
	//console.log(data)
	console.log(`found ${data.length} COUNTRY codes`)
	fs.writeFileSync('countries.json', JSON.stringify(data, null, 2))
})
