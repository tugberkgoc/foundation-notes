
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
