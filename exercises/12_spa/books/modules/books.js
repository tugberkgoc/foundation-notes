
'use strict'

/* eslint-disable no-magic-numbers */

const rest = require('rest')

const google = require('./google')

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
	console.log('calling function searchGoogle')
	console.log(searchString)
	const data = await google.search(searchString)
	console.log(data)
	return data
}
