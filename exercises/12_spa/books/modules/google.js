
'use strict'

/* eslint-disable no-magic-numbers */

const rest = require('rest')
const utility = require('./utility')

/** Makes a Google Books API query
 *
 * @param {String} searchString the URL to use for the query
 */
module.exports.search = async searchString => {
	console.log('REGULAR function searchGoogle')
	const url = utility.buildString(searchString, 2)
	console.log(url)
	const data = await rest(url)
	console.log(data.entity)
	return data.entity
}
