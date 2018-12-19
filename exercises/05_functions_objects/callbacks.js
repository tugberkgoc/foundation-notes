#!/usr/bin/env node

(async() => {
	try {
		const quotes = require('./quotes')
		const data = await quotes.search('douglas adams')
		console.log(data)
		console.log(typeof data)
		console.log(data.length)
	} catch (e) {
		console.log(err.message)
	} finally {
		process.exit(0)
	}
})()
