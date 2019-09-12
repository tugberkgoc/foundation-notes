
'use strict'

const puppeteer = require('puppeteer')

const search = async query => {
	const width = 1920
	const height = 926
	const browser = await puppeteer.launch({ headless: true})
	const page = await browser.newPage()
	await page.setViewport({ width: width, height: height })
	await page.goto(`https://www.brainyquote.com/search_results?q=${query}`, { waitUntil: 'networkidle0' })
	await autoScroll(page)
	const dom = await page.evaluate(() => {
		const elements = document.querySelectorAll('div.m-brick')
		const hotels = []
		elements.forEach((element) => {
			const quoteJson = {}
			try {
				quoteJson.quote = element.querySelector('a.b-qt').innerText
				quoteJson.author = element.querySelector('a.bq-aut').innerText
				quoteJson.tags = element.querySelector('div.kw-box').innerText.split(',').map( tag => tag.trim().toUpperCase())
				//quoteJson.id = document.querySelector('a.b-qt').className.match(/\d+/)[0]
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

async function autoScroll(page){
	await page.evaluate( async() => {
		await new Promise( resolve => {
			let totalHeight = 0
			const distance = 100
			const delay = 60
			const timer = setInterval(() => {
				const scrollHeight = document.body.scrollHeight
				window.scrollBy(0, distance)
				totalHeight += distance

				if(totalHeight >= scrollHeight){
					clearInterval(timer)
					resolve()
				}
			}, delay)
		})
	})
}

module.exports.getQuotes = (query, callback) => search(query).then(data => callback(null, data)).catch(err => callback(err))
