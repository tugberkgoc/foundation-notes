
'use strict'

/**
 * @library functions to handle Google Books API requests.
 * @author <a href="mailto:m.tyers@coventry.ac.uk">Mark Tyers</a>
 * @version 1.0.0
 */

// retrieving a book based on its ID:
// https://www.googleapis.com/books/v1/volumes/zVY9TKaVX0IC
// guide to using the API:
// https://developers.google.com/books/docs/v1/using

const request = require('request')
const minLen = 3
//const indentation = 2

// this function returns an array of book results
/** Searches the Google API for books matching the string.
 * @function searchByString
 * @param {String} req the string to search for
 * @param {Function(Error, Object)} callback run on completion
 */
exports.searchByString = (req, callback) => {
	if(!req.query.q || req.query.q.length <= minLen) return callback(null, [])
	const query = req.query.q

	// ---------- building the URL to query the Google Books API ----------
	const base = 'https://www.googleapis.com/books/v1/volumes'
	const fields = 'items(id,volumeInfo(title,industryIdentifiers))'
	const count = 40
	const url = `${base}?maxResults=${count}&fields=${fields}&q=${query}`
	console.log(url)
	// --------------------------------------------------------------------

	request.get(url, (err, res, body) => {
		if (err) return callback(Error('failed to make API call'))
		const data = JSON.parse(body)
		const books = data.items.map( item => {
			let id = ''
			if (item.volumeInfo.industryIdentifiers) {
				id = item.volumeInfo.industryIdentifiers[0].identifier
			}
			return {title: item.volumeInfo.title, isbn: id, id: item.id}
		})
		callback(null, books)
	})
}
