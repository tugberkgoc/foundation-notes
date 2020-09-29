#!/usr/bin/env node

'use strict'

const fs = require('fs')

const symbol = 'EUR'

const printRates = (err, data) => {
	if (err) throw err
	const parsedData = JSON.parse(data) // this converts the formatted string into a javascript object
	for (const country of parsedData) {
		if (country.code === symbol) {
			console.log(`For each GBP you will get ${country.rate} ${symbol} today.`)
			return
		}
	}
}

const filePath = 'currency.json'

fs.readFile(filePath, printRates)