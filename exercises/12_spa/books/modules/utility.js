
'use strict'

const maxRecords = 20

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
	//console.log(url)
	return url
}

module.exports.buildBookURL = isbn => {
	const isbnLen = 13
	if(typeof isbn !== 'number') {
		throw new Error('parameter has invalid data type')
	}
	if(isbn.toString().length !== isbnLen) {
		throw new Error('invalid isbn')
	}
	const fields = 'items(volumeInfo(title,authors,description,publisher))'
	const url = `https://www.googleapis.com/books/v1/volumes?fields=${fields}&q=isbn:${isbn}`
	return url
}

/* -------------------------------------------------------------------------- */

/**
 * Extracts data from the json
 *   @param   {String} jsonStr the json string to parse
 *   @returns {Array}  an array of book details
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

/**
 * Extracts data from the json
 *   @param   {Array}  bookArray an array containing the books found
 *   @returns {String} a string containing the html table
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
