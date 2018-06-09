
'use strict'

/* eslint-disable no-magic-numbers */

const google = require('./google')

module.exports.search = async request => {
	if(request.query === undefined) {
		return ''
	}
	if(request.query.q === undefined) {
		return ''
	}
	const data = await this.searchGoogle(request.query.q)
	const books = this.extractFields(data)
	const table = this.buildTable(books)
	return table
}

/* -------------------------------------------------------------------------- */

/** Makes a Google Books API query
 *
 * @param {String} searchString the URL to use for the query
 */
module.exports.searchGoogle = async searchString => {
	const data = await google.search(searchString)
	return data
}

/** Extracts data from the json
 *
 * @param {String} jsonStr the json string to parse
 * @returns  {Array} an array of book details
 */
module.exports.extractFields = jsonStr => {
	const bookArray = []
	if(typeof jsonStr !== 'string') {
		throw new Error('parameter has invalid data type')
	}
	const json = JSON.parse(jsonStr)
	if(!Array.isArray(json.items)) throw new Error('no book data found')
	for(const n of json.items) {
		const item = {}
		item.title = n.volumeInfo.title
		for(const m of n.volumeInfo.industryIdentifiers) {
			if(m.type === 'ISBN_13') {
				item.isbn = parseInt(m.identifier)
			}
		}
		bookArray.push(item)
	}
	return bookArray
}

/** Extracts data from the json
 *
 * @param {Array} bookArray an array containing the books found
 * @returns  {String} a string containing the html table
 */
module.exports.buildTable = bookArray => {
	if(typeof bookArray !== 'object') {
		throw new Error('invalid parameter data type')
	}
	if(!Array.isArray(bookArray)) {
		throw new Error('invalid parameter data type')
	}
	let result = '<table>\n'
	for(const n of bookArray) {
		if(n.isbn !== undefined) {
			result += `<tr>
				<td><a href="/details/${n.isbn}">${n.title}</a></td>
				<td>${n.isbn}</td>
				</tr>`
		} else {
			result += `<tr>
			<td>${n.title}</td>
			<td>no ISBN</td>
		</tr>`
		}
	}
	result += '</table>'
	return result
}