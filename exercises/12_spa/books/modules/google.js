
'use strict'

/* eslint-disable no-magic-numbers */

const rest = require('rest')

/**
 * Makes a Google Books API query
 *   @param   {String}  url the URL to use for the query
 *   @returns {Promise} An array of books as a JSON string
 */
module.exports.search = async url => {
	const data = await rest(url)
	//console.log(data.entity)
	return data.entity
}

/**
 *  Makes a Google Books API query to return details of one book
 *  based on its ISBN.
 *    @param   {String}  url the URL to use for the query
 *    @returns {Promise} Book details as a JSON string
 *    @throws  {Error}   invalid isbn
 */
module.exports.getBook = async url => {
	const data = await rest(url)
	const len = parseInt(data.headers['Content-Length'])
	if(len <= 4) throw new Error('invalid isbn')
	const json = JSON.parse(data.entity)
	return JSON.stringify(json.items[0].volumeInfo, null, 2)
}
