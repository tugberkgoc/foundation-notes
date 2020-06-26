#!/usr/bin/env node

/* eslint max-lines-per-function: 0 */
/* eslint complexity: 0 */
/* eslint max-len: 0 */
/* eslint max-lines: 0 */

'use strict'

/* IMPORTING MODULES */
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const staticFiles = require('koa-static')
const js2xmlparser = require('js2xmlparser')

/* CONFIGURING THE MIDDLEWARE */
const app = new Koa()
app.use(bodyParser())
const router = new Router()
app.use(router.routes())
app.use(staticFiles('./public'))

/* GLOBAL VARIABLES */
const port = 8080
let names = []

function hello(ctx) {
	ctx.body = 'Hello World'
}

router.get('/', hello)
// base case

router.get('/anon', ctx => {
	ctx.body = 'Hello World'
	// anon case
})

router.get('/books/:index/:index2', ctx => {
	const books = ['The Hobbit', 'Alice in Wonderland', 'The Secret Garden', '1984']
	const maxIndex = books.length - 1
	const parameters = ctx.params
	console.log(parameters)

	if (isNaN(parameters.index) || isNaN(parameters.index2)) {
		ctx.status = 400
		ctx.body = `Indexes must be numbers`
	} else if (!Number.isInteger(parseFloat(parameters.index))
			|| !Number.isInteger(parseFloat(parameters.index2))) {
		ctx.status = 400
		ctx.body = `Indexes must be integers`
	} else if (parameters.index > maxIndex || parameters.index2 > maxIndex){
		ctx.status = 400
		ctx.body = `Neither index can be greater than ${maxIndex}`
	} else {
		const title = books[parseInt(parameters.index)]
		const title2 = books[parseInt(parameters.index2)]
		ctx.body = `${title}\n${title2}`
	}
})

router.get('/name', ctx => ctx.body = JSON.stringify(ctx.query))

router.get('/hello/:name', ctx => {
	let myname = ctx.params.name

	// only applies uppercase if formatting query exists
	if (ctx.query.format === 'upper') myname = myname.toUpperCase()
	if (ctx.query.format === 'upper') myname = myname.toLowerCase()
	
	if (ctx.query.reverse === 'true') {
		myname = myname.split('').reverse().join('')
	}
	
	ctx.body = `hello ${myname}`
})

router.post('/form', ctx => {
	const minLength = 3
	console.log(ctx.request.body)
	const body = ctx.request.body
	if(body.lastname.length >= minLength) {
		names.push( { firstname: body.firstname, lastname: body.lastname } )
		ctx.status = 201
		ctx.body = `your name is ${body.firstname} ${body.lastname}`
	} else {
		ctx.status = 422
		ctx.body = 'invalid lastname'
	}
	//ctx.body = 'form processed'
})

router.get('/names', ctx => {
	let list = names
	let search = 'x'
	const minLength = 3

	if(ctx.query.search && ctx.query.search.length >= minLength) {
		search = ctx.query.search.toLowerCase()
	} else if(ctx.headers.search && ctx.headers.search.length >= minLength) {
		search = ctx.headers.search.toLowerCase()
	}

	console.log(`Accept: ${ctx.get('Accept')}`)

	if(search.length >= minLength) list = names.filter( val => `${val.firstname} ${val.lastname}`.toLowerCase().includes(search))
	if(list.length === 0) {
		ctx.status = 404
		ctx.body = 'No Names found'
		return
	}
	switch (ctx.accepts('application/json', 'application/xml', 'text/html', 'text/html', 'text/csv')) {
		case 'text/csv':
			ctx.set('content-type', 'text/csv')
			ctx.body = formatCSV(list)
			break
		case 'text/html':
			ctx.set('content-type', 'text/html')
			ctx.body = formatHTML(list)
			break
		case 'application/json':
			ctx.set('content-type', 'application/json')
			ctx.body = {names: list}
			break
		case 'application/xml':
			ctx.set('content-type', 'application/xml')
			ctx.body = js2xmlparser.parse('people', list)
			break
		default:
			ctx.status = 406
			ctx.body = 'unsupported MIME type'
			break
	}
})

router.del('/names', ctx => {
	names = []
	ctx.status = 204
	ctx.body = 'all names deleted'
})

function formatCSV(list) {
	let data = ''
	for(const name of list) data += `${name.firstname}, ${name.lastname}\n`
	return data
}

function formatHTML(list) {
	let data = '<html><head><link rel="stylesheet" href="main.css"/></head><body><table>'
	for(const name of list) {
		data += `<tr><td>${name.firstname}</td><td>${name.lastname}</td>\n`
	}
	data += '</table></body></html>'
	return data
}

module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
