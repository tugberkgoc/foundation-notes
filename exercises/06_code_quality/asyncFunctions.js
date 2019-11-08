
'use strict'

const request = require('request')
const readline = require('readline-sync')

const baseURL = 'https://api.exchangeratesapi.io/latest'

async function main() {
	try {
		const base = await getInput('enter base currency')
		await checkValidCurrencyCode(base)
		const data = await getData(`${baseURL}?base=${base}`)
		await printObject(data)
		const to = await getInput('convert to')
		console.log(to)
		process.exit()
	} catch (err) {
		console.log(`error: ${err.message}`)
	}
}

const getInput = prompt => new Promise(resolve => {
	const response = readline.question(`${prompt}: `)
	return resolve(response)
})

const checkValidCurrencyCode = code => new Promise( (resolve, reject) => {
	code = code.trim()
	request(baseURL, (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		const rates = JSON.parse(body).rates
		if (!rates.hasOwnProperty(code)) it.throw(new Error(`invalid currency code ${code}`))
		resolve()
	})
})

const getData = url => new Promise( (resolve, reject) => {
	request(url, (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		resolve(body)
	})
})

const printObject = data => new Promise( (resolve) => {
	const indent = 2
	data = JSON.parse(data)
	const str = JSON.stringify(data, null, indent)
	console.log(str)
	resolve()
})

main()
