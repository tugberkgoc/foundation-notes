
'use strict'

/* eslint-disable no-magic-numbers */

const rest = require('rest')

const google = require('./google')

const minQueryLen = 3

// module.exports.search = request => new Promise( async resolve => {
// 	console.log(request.query)
// 	if(!request.query.q || request.query.q.length <= minQueryLen) {
// 		console.log('no querystring')
// 		return resolve({status: 200, data: []})
// 	}
// 	const url = this.buildString('java', 2)
// 	const data = await rest(url)
// 	//console.log(data)
// })

/* -------------------------------------------------------------------------- */

/** Makes a Google Books API query
 *
 * @param {String} searchString the URL to use for the query
 */
module.exports.searchGoogle = async searchString => {
	//console.log('calling function searchGoogle')
	//console.log(searchString)
	const data = await google.search(searchString)
	//console.log(data)
	return data
}

module.exports.extractFields = jsonStr => {
	const bookArray = []
	const json = JSON.parse(jsonStr)
	if(!Array.isArray(json.items)) throw new Error('no book data found')
	for(const n of json.items) {
		let item = {}
		console.log(n)
		item.title = n.volumeInfo.title
		for(const m in n.industryIdentifiers) {
			//console.log(m)
			if(m.type === 'ISBN_13') {
				// xxx
			}
		}
		bookArray.push(item)
	}
	return bookArray
}
