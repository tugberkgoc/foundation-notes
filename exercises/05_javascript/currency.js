#!/usr/bin/env node

'use strict'

const request = require('request')

const symbol = 'GBP'

const printRates = (err, res, body) => {
	if (err) throw 'could not complete request'
	const data = JSON.parse(body) // this converts the formatted string into a javascript object
	console.log(`for each EUR you will get ${data.rates[symbol]} ${symbol} today`)
}

const url = 'currency.json'

request.get( url, printRates)
