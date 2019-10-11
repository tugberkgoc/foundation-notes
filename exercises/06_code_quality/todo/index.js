#!/usr/bin/env node

'use strict'

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

const port = 8080

const items = []

// const List = require('./modules/list')
// const list = new List()

router.get('/', async ctx => {
	try {
		const data = {}
		if(ctx.query.msg) data.msg = ctx.query.msg
		data.items = items.map( (element, index) => ({key: index, item: element.item, qty: element.qty}))
		console.log(data.items)
		ctx.render('home', data)
	} catch(err) {
		console.log(err.message)
		ctx.render('home', {msg: err.message})
	}
})

router.post('/', ctx => {
	try {
		const body = ctx.request.body
		const data = {item: body.item, qty: body.qty}
		items.push(data)
		ctx.redirect('/')
	} catch(err) {
		console.log(err.message)
		ctx.redirect(`/?msg=${err.message}`)
	}
})

router.get('/delete/:key', ctx => {
	try {
		console.log(`key: ${ctx.params.key}`)
		items.splice(ctx.params.key, 1)
		ctx.redirect('/msg=item deleted')
	} catch(err) {
		console.log(err.message)
		ctx.redirect(`/${err.message}`)
	}
})

module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
