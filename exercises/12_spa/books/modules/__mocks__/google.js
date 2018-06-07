
'use strict'

/* eslint-disable no-magic-numbers */

const fs = require('fs')

/** Makes a Google Books API query
 *
 * @param {String} searchString the URL to use for the query
 */
module.exports.search = async searchString => {
	console.log('MOCK function searchGoogle')
	console.log(__dirname)
	const file = `./modules/__mocks__/__mockData__/${searchString}.json`
	console.log(file)
	const data = fs.readFileSync(file)
	const json = JSON.parse(data)
	console.log(json)
	return JSON.stringify(json, null, 2)
}
