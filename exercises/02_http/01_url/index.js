#!/usr/bin/env node

'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const port = 8080

function hello(ctx) {
	ctx.body = 'Hello World'
}

router.get('/', hello)

router.get('/anon', ctx => {
	ctx.body = 'Hello World'
})

const books = ['The Hobbit', 'Alice in Wonderland', 'The Secret Garden']

router.get('/books/:index', ctx => {
	const parameters = ctx.params
	console.log(parameters)
	const title = books[parameters.index]
	ctx.body = title
})

router.get('/name', ctx => {
	const queryStrings = ctx.query
	console.log(queryStrings)
	ctx.body = JSON.stringify(queryStrings)
})

router.get('/hello/:name', ctx => {
	console.log(ctx.params)
	let myname = ctx.params.name
	if(ctx.query.format === 'upper') myname = myname.toUpperCase()
	console.log(`myname: ${myname}`)
	ctx.body = `hello ${myname}`
})

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
