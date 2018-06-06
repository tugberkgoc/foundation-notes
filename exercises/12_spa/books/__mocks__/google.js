
'use strict'

/* eslint-disable no-magic-numbers */

const rest = require('rest')
const fs = require('fs')

/** Makes a Google Books API query
 *
 * @param {String} searchString the URL to use for the query
 */
module.exports.search = async searchString => {
	console.log('MOCK function searchGoogle')
	const data = await rest(this.buildString(searchString, 2))
	console.log(data.entity)
	return data.entity
}
