#!/usr/bin/env node

'use strict'

require('fs').readFile('quotes.json', (err, data) => {
	if (err) console.log(err)
	const quotesArray = JSON.parse(data)
	console.log(quotesArray)
	for (const quoteObject of quotesArray) {
		console.log(quoteObject.quote)
	}
})