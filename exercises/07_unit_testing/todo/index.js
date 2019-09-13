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

const todo = require('./modules/todo')

router.get('/', async ctx => {
	try {
		const data = todo.getAll()
		ctx.render('home', {items: data})
	} catch(err) {
		console.log(err.message)
		ctx.render('empty')
	}
})

router.post('/', ctx => {
	try {
		const body = ctx.request.body
		todo.add(body.item, body.qty)
	} catch(err) {
		console.log(err.message)
	} finally {
		ctx.redirect('/')
	}
})

router.get('/delete/:key', ctx => {
	try {
		console.log(`key: ${ctx.params.key}`)
		todo.delete(ctx.params.key)
	} catch(err) {
		console.log(err.message)
	} finally {
		ctx.redirect('/')
	}
})

module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
