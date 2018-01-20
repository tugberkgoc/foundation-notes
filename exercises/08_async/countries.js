#!/usr/bin/env node
/* eslint no-magic-numbers: 0 */

'use strict'

const request = require('sync-request')

function checkCountryCode(code = 'GB') {
	const url = `https://restcountries.eu/rest/v2/alpha/${code}`
	console.log(url)
	const res = request('GET', url)
	if (res.statusCode === 400) {
		throw new Error(`invalid country code: ${code}`)
	}
	return `${code} is a valid country code`
}

try {
	console.log(checkCountryCode('FR'))
	console.log(checkCountryCode('F'))
} catch(err) {
	console.log(err.message)
}
