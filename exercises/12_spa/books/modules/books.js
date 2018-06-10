
'use strict'

/* eslint-disable no-magic-numbers */

const utility = require('./utility')
const google = require('./google')
//jest.mock('./google')

/**
 * Makes a Google Books API query
 *   @param   {String}  request the http request object
 *   @returns {Promise} an html table of data as a string
 */
module.exports.search = async request => {
	if(request.query === undefined) {
		return ''
	}
	if(request.query.q === undefined) {
		return ''
	}
	const url = utility.buildString(request.query.q)
	const data = await google.search(url)
	const books = utility.extractFields(data)
	const table = utility.buildTable(books)
	return table
}

module.exports.details = async request => {
	//delete request.params
	if(request.params === undefined) {
		return Promise.reject('invalid isbn')
	}
	const url = utility.buildBookURL(request.params.isbn)
	const data = await google.getBook(url)
	return data
}
