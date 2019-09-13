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
const dbName = 'todo.db'

const ToDo = require('./modules/todo')

router.get('/', async ctx => {
	try {
		const todo = await new ToDo(dbName)
		const data = {}
		if(ctx.query.msg) data.msg = ctx.query.msg
		data.items = await todo.getAll()
		console.log('all records')
		console.log(data)
		ctx.render('home', data)
	} catch(err) {
		console.log(err.message)
		ctx.render('home', {msg: err.message})
	}
})

router.post('/', async ctx => {
	try {
		const todo = await new ToDo(dbName)
		const body = ctx.request.body
		todo.add(body.item, body.qty)
		ctx.redirect('/')
	} catch(err) {
		console.log(err.message)
		ctx.redirect(`/?msg=${err.message}`)
	}
})

router.get('/delete/:key', ctx => {
	try {
		console.log(`key: ${ctx.params.key}`)
		todo.delete(ctx.params.key)
		ctx.redirect('/msg=item deleted')
	} catch(err) {
		console.log(err.message)
		ctx.redirect(`/${err.message}`)
	}
})

module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
