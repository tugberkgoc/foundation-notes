
'use strict'

/* eslint-disable no-magic-numbers */

const fs = require('fs')

/**
 * Makes a Google Books API query
 * 		@param {String} searchString the URL to use for the query
 * 		@returns  {String} a JSON-formatter string
 */
module.exports.search = async url => {
	const [,query] = url.split('q=') // destructuring assignment
	const file = `./modules/__mocks__/__mockData__/${query}.json`
	const data = fs.readFileSync(file)
	const json = JSON.parse(data)
	return JSON.stringify(json, null, 2)
}

/**
 * Retrieved data on a book using a RESTful API URL
 * 		@param {String} searchString the URL to use for the query
 * 		@returns  {String} a JSON-formatter string
 */
module.exports.getBook = async url => {
	const [,isbn] = url.split('q=isbn:') // destructuring assignment
	const file = `./modules/__mocks__/__mockData__/${isbn}.json`
	const data = fs.readFileSync(file)
	const json = JSON.parse(data)
	return JSON.stringify(json, null, 2)
}
