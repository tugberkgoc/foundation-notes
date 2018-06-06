
'use strict'

/* eslint-disable no-magic-numbers */

const rest = require('rest')

const google = require('./google')

const maxRecords = 20
const minQueryLen = 3

module.exports.search = request => new Promise( async resolve => {
	console.log(request.query)
	if(!request.query.q || request.query.q.length <= minQueryLen) {
		console.log('no querystring')
		return resolve({status: 200, data: []})
	}
	const url = this.buildString('java', 2)
	const data = await rest(url)
	console.log(data)
})

/* -------------------------------------------------------------------------- */

/** Makes a Google Books API query
 *
 * @param {String} searchString the URL to use for the query
 */
module.exports.searchGoogle = async searchString => {
	console.log('function searchGoogle')
	const data = await google.search(searchString)
	console.log(data)
	return data.entity
}

/** Builds the url needed by the Google Books API.
 * @function buildString
 * @param    {String} query the string to search for
 * @param    {Number} [count=40] the number of records to return (max 40)
 * @returns  {String} the URL
 */
module.exports.buildString = (query, count = maxRecords) => {
	if(count > maxRecords || count < 1) {
		throw new Error('invalid count parameter')
	}
	const base = 'https://www.googleapis.com/books/v1/volumes'
	const fields = 'items(id,volumeInfo(title,industryIdentifiers))'
	const url = `${base}?maxResults=${count}&fields=${fields}&q=${query}`
	console.log(url)
	return url
}
