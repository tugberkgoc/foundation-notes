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

const data = []

router.get('/', async ctx => {
	try {
		const data = {}
		if(ctx.query.msg) data.msg = ctx.query.msg
		for(const key in data) data.items[key].key = key
		ctx.render('home', data)
	} catch(err) {
		console.log(err.message)
		ctx.render('home', {msg: err.message})
	}
})

router.post('/', ctx => {
	try {
		const body = ctx.request.body
		body.qty = Number(body.qty)
		if(isNaN(body.qty)) throw new Error('the quantity must be a number')
		data.push({item: body.item, qty: body.qty})
		ctx.redirect('/')
	} catch(err) {
		console.log(err.message)
		ctx.redirect(`/?msg=${err.message}`)
	}
})

router.get('/delete/:key', ctx => {
	try {
		console.log(`key: ${ctx.params.key}`)
		ctx.redirect('/msg=item deleted')
	} catch(err) {
		console.log(err.message)
		ctx.redirect(`/${err.message}`)
	}
})

module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
