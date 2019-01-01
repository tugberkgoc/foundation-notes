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

router.get('/', async ctx => await ctx.render('home'))

router.get('/date', async ctx => {
	const d = new Date()
	const date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
	const data = {
		title: 'My First Template',
		today: date
	}
	await ctx.render('date', data)
})

router.get('/food', async ctx => {
	const food = [
		{name: 'bread', qty: 5},
		{name: 'butter', qty: 2},
		{name: 'jam', qty: 1},
		{name: 'cheese', qty: 4}
	]
	await ctx.render('food', {myFood: food})
})

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
