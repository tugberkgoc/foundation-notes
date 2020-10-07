
'use strict'

const request = require('request')
const readline = require('readline')
const fs = require('fs')

const baseURL = 'https://api.exchangeratesapi.io/latest'

const getInput = prompt => new Promise(resolve => {
	const read = readline.createInterface({ input: process.stdin, output: process.stdout })
	read.question(`${prompt}: `, value => {
		console.log(`You entered ${value}`)
		read.close()
		return resolve(value)
	})
})

const checkValidCurrencyCode = code => new Promise( (resolve, reject) => {
	code = code.trim()
	request(baseURL, (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		const rates = JSON.parse(body).rates
		if (!rates.hasOwnProperty(code)) reject(new Error(`invalid currency code ${code}`))
		return resolve(code)
	})
})

const getData = code => new Promise( (resolve, reject) => {
	request(`${baseURL}?base=${code}`, (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		return resolve(body)
	})
})

const printObject = data => new Promise( resolve => {
	const indent = 2
	data = JSON.parse(data)
	const str = JSON.stringify(data, null, indent)
	console.log(str)
	return resolve()
})

const exit = () => new Promise( () => {
	process.exit()
})

const readObjectFromFile = fileName => new Promise( (resolve, reject) => {
	fs.readFile(fileName, 'utf-8', (err, content) => {
		if (err) reject(new Error(err))
		return resolve(JSON.parse(content))
	})
})

getInput('enter base currency')
	.then(checkValidCurrencyCode)
	.then(code => this.base = code)
	.then( () => getData(this.base))
	.then( body => this.rates = JSON.parse(body).rates)
	.then( () => getInput('convert to'))
	.then(checkValidCurrencyCode)
	.then( code => this.convertTo = code)
	.then( () => readObjectFromFile('currencies.json'))
	.then(fileObject => this.decoder = fileObject)
	.then( () => getInput('enter exchange amount'))
	.then( amount => console.log(`${amount} ${this.decoder[this.base]} (${this.base}) is worth ${
		(this.rates[this.convertTo] * amount).toFixed(4)} ${this.decoder[this.convertTo]} (${this.convertTo})`))
	.then(exit)
	.catch(err => console.error(`error: ${err.message}`))
	  .then(exit)