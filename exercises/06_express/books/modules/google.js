
'use strict'

/**
Used to make calls to the Google Books API.
 * @module google
 */

const request = require('request')

/** Searches the Google API for books matching the string.
 * @function searchByString
 * @param {String} query the string to search for
 * @param {Function(Error, Object)} callback run on completion
 */
exports.searchByString = (query, callback) => {
	const url = `https://www.googleapis.com/books/v1/volumes?maxResults=40&fields=items(id,volumeInfo(title,industryIdentifiers))&q=${query}`

	request.get(url, (err, res, body) => {
		if (err) {
			callback(Error('failed to make API call'))
		}
		const data = JSON.parse(body)
		callback(null, data)
	})
}

/** Returns details of the book specified by the supplied ISBN.
 * @function getByISBN
 * @param {String} isbn the ISBN of the book to return
 * @param {Function(Error, Object)} callback run on completion
 */
exports.getByISBN = (isbn, callback) => {
	const url = `https://www.googleapis.com/books/v1/volumes?fields=items(volumeInfo(title,authors,description, publisher))&q=isbn:${isbn}`

	request.get( url, (err, res, body) => {
		if (err) {
			callback(err)
			return
		}
		const json = JSON.parse(body)

		if (json.totalItems === 0) {
			callback( new Error('book not found'))
		}
		const data = {
			isbn: isbn,
			title: json.items[0].volumeInfo.title,
			authors: json.items[0].volumeInfo.authors,
			description: json.items[0].volumeInfo.description
		}
		callback(null, data)
	})
}
