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

const sqlite = require('sqlite-async')

app.use(views(`${__dirname}/views`, { extension: 'handlebars' }, {map: { handlebars: 'handlebars' }}))

router.get('/', async ctx => {
	try {
		const data = {}
		if(ctx.query.msg) data.msg = ctx.query.msg
		const db = await sqlite.open('./bookshop.db')
		data.books = await db.all('SELECT id, title FROM books;')
		await db.close()
		await ctx.render('home', data)
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

// router.get('/', async ctx => {
// 	try {
// 		let sql = 'SELECT id, title FROM books;'
// 		const data = {}
// 		if(ctx.query.msg) data.msg = ctx.query.msg
// 		if(ctx.query !== undefined && ctx.query.q !== undefined) {
// 			sql = `SELECT id, title FROM books 
// 							WHERE upper(title) LIKE "%${ctx.query.q}%" 
// 							OR upper(description) LIKE upper("%${ctx.query.q}%");`
// 			data.query = ctx.query.q
// 		}
// 		const db = await sqlite.open('./bookshop.db')
// 		data.books = await db.all(sql)
// 		await db.close()
// 		await ctx.render('newindex', data)
// 	} catch(err) {
// 		await ctx.render('error', {message: err.message})
// 	}
// })

router.get('/details/:id', async ctx => {
	try {
		const db = await sqlite.open('./bookshop.db')
		const data = await db.get(`SELECT * FROM books WHERE id = ${ctx.params.id};`)
		await db.close()
		await ctx.render('details', data)
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})
router.get('/form', async ctx => await ctx.render('form'))

router.post('/add', async ctx => {
	try {
		const body = ctx.request.body
		console.log(body)
		const db = await sqlite.open('./bookshop.db')
		await db.run( `INSERT INTO books(title, isbn, description) VALUES("${body.title}", "${body.isbn}", "${body.description}");`)
		await db.close()
		ctx.redirect(`/?msg=inserted "${body.title}"`)
	} catch(err) {
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
