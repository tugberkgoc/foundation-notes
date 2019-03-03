#!/usr/bin/env node

const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const views = require('koa-views')
app.use(require('koa-static')('public'))
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
const port = 8080

app.use(views(`${__dirname}/views`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))

router.get('/postform', async ctx => await ctx.render('post'))
router.get('/getform', async ctx => await ctx.render('get'))
router.get('/lists', async ctx => await ctx.render('lists'))
router.get('/semantic', async ctx => await ctx.render('form-skel'))

router.get('/getform/process', async ctx => {
	console.log(ctx.query)
	let data = '<html><body><h1>Retrieving Data in Querystring</h1><table>'
	for(const param in ctx.query) {
		console.log(param)
		data += `<tr><td>${param}</td><td>${ctx.query[param]}</td></tr>`
	}
	data += '</table></body></html>'
	ctx.body = data
})

router.post('/postform/process', async ctx => {
	console.log(ctx.request.body)
	let data = '<html><body><h2>Retrieving Data in Body</h2><table>'
	for (const key in ctx.request.body) {
		if (ctx.request.body.hasOwnProperty(key)) {
			console.log(key)
			console.log(ctx.request.body[key])
			data += `<tr><td>${key}</td><td>${ctx.request.body[key]}</td></tr>`
		}
	}
	data += '</table></body></html>'
	ctx.body = data
})

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
