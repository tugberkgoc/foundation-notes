
'use strict'

/* eslint-disable no-magic-numbers */

const rest = require('rest')
const utility = require('./utility')

/** Makes a Google Books API query
 *
 * @param {String} searchString the URL to use for the query
 */
module.exports.search = async searchString => {
	const url = utility.buildString(searchString, 20)
	const data = await rest(url)
	//console.log(data.entity)
	return data.entity
}
