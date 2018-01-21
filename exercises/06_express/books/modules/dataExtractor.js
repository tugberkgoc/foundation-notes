
'use strict'

/**
Module to extract data from the 'request' object.
 * @module request
 */

/** Extracts the specified parameter from the supplied request object.
 * @param   {Object} request The request object sent with the client request.
 * @param   {String} header  The header to extract.
 * @returns {String}         the value of the request header key.
 * @throws  {Error}          if the request header key does not exist.
 */
exports.getHeader = (request, header) => {
	if (request.headers === undefined || request.headers[header] === undefined)
		throw new Error('request header missing')
	return request.headers[header]
}

/** Extracts the specified parameter from the supplied request object.
 * @param   {Object} request The request object sent with the client request.
 * @param   {String} param   The parameter to extract.
 * @returns {String}         the value of the parameter.
 * @throws  {Error}          if the parameter does not exist.
 */
exports.getParameter = (request, param) => {
	if (request.params === undefined || request.params[param] === undefined)
		throw new Error('parameter missing')
	return request.params[param]
}

/** Extracts the value of the specified body key
 *  from the supplied request object.
 * @param   {Object} request The request object sent with the client request.
 * @param   {String} key     The parameter to extract.
 * @returns {String}         the value of the key.
 * @throws  {Error}          if the key does not exist.
 */
exports.extractBodyKey = (req, key) => {
	if (req.body === undefined || req.body[key] === undefined)
		throw new Error('missing key in request body')
	return req.body[key]
}

/** Extracts the username and password passed in the HTTP request.
 * @param   {Object} request The request object sent by the client.
 * @returns {Object}         An object with the supplied username and password.
 * @throws  {Error}          if the username and/or password are missing.
 */
exports.getCredentials = (request) => {
	if (request.authorization === undefined || request.authorization.basic === undefined)
		throw new Error('authorization header missing')
	const auth = request.authorization.basic

	if (auth.username === undefined || auth.password === undefined)
		throw new Error('missing username and/or password')
	return {username: auth.username, password: auth.password}
}

/** Replaces the host URL in the data.
 * @param   {Object} request The data from the Google API call.
 * @returns {Object}         The data with the correct URL.
 */
exports.replaceHostname = (req, data) => {
	const host = req.headers.host || 'http://localhost'
	const clean = data.items.map( element => {
		const isbnData = element.volumeInfo.industryIdentifiers
		let a = undefined
		if (Object.prototype.toString.call(isbnData) === '[object Array]') {
			a = isbnData.find( element => element.type === 'ISBN_10' )
			const book = {
				title: element.volumeInfo.title,
				isbn: a.identifier,
				link: `http://${host}/books/${a.identifier}`
			}
			return book
		}
	})
	return {books: clean}
}
