#!/usr/bin/env node

/**
 * Server index module
 * @module index
 */

const Koa = require('koa')
const Router = require('koa-router')
const stat = require('koa-static')
const bodyParser = require('koa-bodyparser')
const handlebars = require('koa-hbs-renderer')

const app = new Koa()
const router = new Router()
app.use(stat('public'))
app.use(bodyParser())
app.use(handlebars({ paths: { views: `${__dirname}/views` } }))
app.use(router.routes())

// The through which the server will communicate
const port = 8080

const List = require('./modules/list').List
const list = new List()

/**
 * Get the home page
 * @name Home
 * @route {GET} /
 */
router.get('/', ctx => {
	try {
		const items = list.getAll()
		console.log(items)
		const data = {items}
		ctx.render('home', data)
	} catch(err) {
		console.log(err.message)
		ctx.render('home', {msg: err.message})
	}
})

/**
 * Add an item to the list
 * @name Add item
 * @route {POST} /
 */
router.post('/', ctx => {
	try {
		const body = ctx.request.body
		console.log(body)
		list.add(body.item, body.qty)
		ctx.redirect('/')
	} catch(err) {
		console.log(err.message)
		ctx.redirect(`/?msg=${err.message}`)
	}
})

/**
 * Delete an item from the list
 * @name Delete item
 * @route {get} /delete/:key
 */
router.get('/delete/:key', ctx => {
	try {
		const key = ctx.params.key
		console.log(`key: ${key}`)
		list.delete(key)
		ctx.redirect('/?msg=item deleted')
	} catch(err) {
		console.log(err.message)
		ctx.redirect(`/${err.message}`)
	}
})

module.exports = app.listen(port, () => {
	console.log(`listening on port ${port}`)
})
