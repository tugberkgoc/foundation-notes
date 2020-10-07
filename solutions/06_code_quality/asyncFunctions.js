
'use strict'

const request = require('request')
const readline = require('readline-sync')
const fs = require('fs')

const baseURL = 'https://api.exchangeratesapi.io/latest'

async function main() {
	try {
		const base = await getInput('enter base currency')
		await checkValidCurrencyCode(base)
		const data = await getData(`${baseURL}?base=${base}`)
		const rates = JSON.parse(data).rates
		await printObject(data)
		const to = await getInput('convert to')
		await checkValidCurrencyCode(to)
		console.log(to)
		const amount = await getInput('enter exchange amount')
		const decoder = await readObjectFromFile('currencies.json')
		console.log(`${amount} ${decoder[base]} (${base}) is worth ${
			(rates[to] * amount).toFixed(4)} ${decoder[to]} (${to})`)
		process.exit()
	} catch (err) {
		console.log(`error: ${err.message}`)
	}
}

const getInput = async prompt => readline.question(`${prompt}: `)

const checkValidCurrencyCode = code => new Promise( (resolve, reject) => {
	code = code.trim()
	request(baseURL, (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		const rates = JSON.parse(body).rates
		if (!rates.hasOwnProperty(code)) throw new Error(`invalid currency code ${code}`)
		resolve()
	})
})

const getData = url => new Promise( (resolve, reject) => {
	request(url, (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		resolve(body)
	})
})

const printObject = async data => {
	const indent = 2
	data = await JSON.parse(data)
	const str = JSON.stringify(data, null, indent)
	await new Promise( resolve => {
		console.log(str)
		resolve()
	})

}

const readObjectFromFile = fileName => new Promise( (resolve, reject) => {
	fs.readFile(fileName, 'utf-8', (err, content) => {
		if (err) reject(new Error(err))
		return resolve(JSON.parse(content))
	})
})

main()
