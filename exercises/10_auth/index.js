#!/usr/bin/env node

/* MODULE IMPORTS */
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const sqlite = require('sqlite-async')
const bcrypt = require('bcrypt-promise')

const app = new Koa()
const router = new Router()

/* CONFIGURING THE MIDDLEWARE */
app.keys = ['darkSecret']
app.use(staticDir('public'))
app.use(bodyParser())
app.use(session(app))
app.use(views(`${__dirname}/views`, { extension: 'handlebars' }, {map: { handlebars: 'handlebars' }}))

const port = 8080
const saltRounds = 10

router.get('/', async ctx => {
	try {
		if(ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const data = {}
		if(ctx.query.msg) data.msg = ctx.query.msg
		await ctx.render('index')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
	// if(!req.session.authenticated) return res.redirect('/login')
})

router.get('/register', async ctx => await ctx.render('register'))

router.post('/register', async ctx => {
	try {
		const body = ctx.request.body
		console.log(body)
		body.pass = await bcrypt.hash(body.pass, saltRounds)
		console.log(body)
		const sql = `INSERT INTO users(name, username, email, password) 
			VALUES("${body.name}", "${body.user}", "${body.email}", "${body.pass}")`
		console.log(sql)
		const db = await sqlite.open('./website.db')
		await db.run(sql)
		await db.close()
		ctx.redirect(`/?msg=new user "${body.name}" added`)
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/login', async ctx => {
	const data = {}
	if(ctx.query.msg) data.msg = ctx.query.msg
	if(ctx.query.user) data.user = ctx.query.user
	await ctx.render('login', data)
})

router.post('/login', async ctx => {
	try {
		const body = ctx.request.body
		const db = await sqlite.open('./website.db')
		const records = await db.get(`SELECT count(id) AS count FROM users WHERE username="${body.user}";`)
		if(!records.count) return ctx.redirect('/login?msg=invalid%20username')
		const record = await db.get(`SELECT password FROM users WHERE username = "${body.user}";`)
		await db.close()
		const valid = await bcrypt.compare(body.pass, record.password)
		if(valid === false) return ctx.redirect(`/login?user=${body.user}&msg=invalid%20password`)
		//TODO: credentials valid!
		ctx.session.authorised = true
		return ctx.redirect('/?msg=you are now logged in...')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/')
})

app.use(router.routes())
module.exports = app.listen(port, async() => {
	const db = await sqlite.open('./website.db')
	await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, username TEXT, email TEXT, password TEXT);')
	await db.close()
	console.log(`listening on port ${port}`)
})
