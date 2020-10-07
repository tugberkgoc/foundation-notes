#!/usr/bin/env node

/* eslint max-lines-per-function: 0 */

'use strict'

const request = require('request')
const readline = require('readline')
const fs = require('fs')

const io = { input: process.stdin, output: process.stdout }

const read = readline.createInterface(io)
read.question('input base currency: ', base => {
	console.log(`You entered ${base}`)
	read.close()
	base = base.trim()
	// now we need to check the code is valid
	request('https://api.exchangeratesapi.io/latest', (err, res, body) => {
		if (err) {
			console.error(err.message)
			process.exit()
		}
		const rates = JSON.parse(body).rates
		if (!rates.hasOwnProperty(base)) {
			console.error(`invalid currency code ${base}`)
			process.exit()
		}
		// now we can get the currency rates
		request(`https://api.exchangeratesapi.io/latest?base=${base}`, (err, res, body) => {
			if (err) {
				console.error(err.message)
				process.exit()
			}
			body = JSON.parse(body)
			console.log(body)
			// lets ask another question
			const read = readline.createInterface(io)
			read.question('convert to: ', convertTo => {
				read.question('amount to convert: ', amount => {
					read.close()
					fs.readFile('currencies.json', 'utf8', (err, content) => {
						if(err) console.error(error.message)
						const decoder = JSON.parse(content)
						console.log(`${amount} ${decoder[base]} (${base}) is worth ${
							(body.rates[convertTo] * amount).toFixed(4)} ${decoder[convertTo]} (${convertTo})`)
					})
				})
			})
		})
	})
})
