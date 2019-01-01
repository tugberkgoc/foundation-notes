#!/usr/bin/env node

'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')

const app = new Koa()
app.use(bodyParser())
app.use(require('koa-static')('public'))

app.use(views(`${__dirname}/views`, { extension: 'handlebars' }, { map: { handlebars: 'handlebars'}}))

const router = new Router()

const port = 8080

const sqlite = require('sqlite')

router.get('/', async ctx => {
	try {
		const db = await sqlite.open('./bookshop.db')
		const data = await db.all('SELECT id, title FROM books;')
		await ctx.render('home', {books: data})
	} catch(err) {
		console.error(err.message)
		await ctx.render('error', {message: err.message})
	}
})

router.get('/details/:id', async ctx => {
	try {
		const db = await sqlite.open('./bookshop.db')
		console.log(`book id: ${ctx.params.id}`)
		const data = await db.get(`SELECT * FROM books WHERE id = ${ctx.params.id};`)
		console.log(`data: ${data}`)
		if(data === undefined) throw new Error('unrecogised book id')
		await ctx.render('details', data)
	} catch(err) {
		console.error(err.message)
		await ctx.render('error', {message: err.message})
	}
})

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
