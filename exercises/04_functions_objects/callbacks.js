#!/usr/bin/env node

'use strict'

const quotes = require('./quotes')

quotes.getQuotes('philip larkin', (err, data) => {
	if(err) console.log(err.message)
	console.log(data)
})
