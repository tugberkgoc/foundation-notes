#!/usr/bin/env node

const fs = require('fs-extra')
const js2xmlparser = require('js2xmlparser')
const Koa = require('koa')
const Router = require('koa-router')
const status = require('http-status-codes')
const views = require('koa-views')
const send = require('koa-send')

const app = new Koa()
const router = new Router()
//const sendfile = require('koa-sendfile')

app.use(views(`${__dirname}/views`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))

const port = 8080

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const staticFiles = require('koa-static')
app.use(staticFiles('./public'))

const names = []

router.get('/', ctx => {
	ctx.body = 'Hello World'
})

router.get('/hello', async ctx => {
	await ctx.render('hello')
})

router.get('/hello/:name', ctx => {
	console.log(ctx.params)
	const myname = ctx.params.name
	ctx.body = `hello ${myname}`
})

router.get('/hello/:first/:last', ctx => {
	console.log(ctx.params)
	const name = {
		firstname: ctx.params.first,
		lastname: ctx.params.last
	}
	console.log(name)
	ctx.body = `hello ${name.firstname} ${name.lastname}`
})

router.get('/animal/:name', async ctx => {
	try {
		console.log(ctx.params.name)
		const exists = await fs.pathExists(`public/${ctx.params.name}.png`)
		if(exists === false) throw new Error(`There is no ${ctx.params.name} image`)
		console.log(`found ${ctx.params.name}.png`)
		ctx.set('content-type', 'image/png')
		console.log('sending file')
		const filename = `./public/${ctx.params.name}.png`
		console.log(filename)
		await send(ctx, filename)
	} catch(err) {
		console.log(err.message)
		ctx.status = status.NOT_FOUND
		ctx.body = err.message
	}
})

router.get('/form', async ctx => {
	await ctx.render('form')
})

router.post('/form', async ctx => {
	try {
		console.log('processing the file')
		const min = 3
		const body = ctx.request.body
		console.log(body)
		if(body.firstname === undefined || body.lastname === undefined) {
			throw new Error('missing data in request body')
		}
		if(body.firstname.length < min || body.lastname.length < min) {
			throw new Error('invalid data in request body')
		}
		names.push( { firstname: body.firstname, lastname: body.lastname } )
		ctx.status = status.CREATED
		ctx.body = `your name is ${body.firstname} ${body.lastname}`
	} catch(err) {
		ctx.status = status.UNPROCESSABLE_ENTITY
		ctx.body = err.message
	}
})

router.get('/names', async ctx => {
	try {
		const min = 3
		let list = names
		let search = 'x'
		if(ctx.get('search') && ctx.get('search').length >= min) search = ctx.get('search').toLowerCase()
		if(ctx.query.search && ctx.query.search.length >= min) search = ctx.query.search.toLowerCase()
		console.log(`search: ${search}`)
		if(search.length >= min) {
			console.log(`you are searching for '${search}'`)
			list = names.filter( val => `${val.firstname} ${val.lastname}`.toLowerCase().includes(search))
		}
		if(list.length === 0) {
			ctx.status = status.NOT_FOUND
			ctx.body = 'No Names found'
			return
		}
		// we have some data to display!
		console.log(`accept header: ${ctx.get('accept')}`)
		console.log(`type: ${ctx.request.type}`)
		let body = ''
		let statusCode = status.OK
		switch(ctx.get('accept')) {
			case 'text/csv':
				console.log('plain text')
				body = getCsv(list)
				break
			case 'text/html':
				console.log('web page')
				body = getHtml(list)
				break
			case 'application/json':
				console.log('JSON data')
				body = getJson(list)
				break
			case 'application/xml':
				console.log('xml data')
				body = getXml(list)
				break
			default:
				console.log('invalid content type')
				statusCode = status.NOT_ACCEPTABLE
		}
		ctx.set('content-type', ctx.get('accept'))
		ctx.status = statusCode
		ctx.body = body

	} catch(err) {
		//
	}
})

function getCsv(names) {
	let data = ''
	for(const name of names) {
		data += `${name.firstname}, ${name.lastname}\n`
	}
	return data
}

function getHtml(names) {
	let data = '<html><head><link rel="stylesheet" href="main.css"/></head><body><table>'
	for(const name of names) {
		data += `<tr><td>${name.firstname}</td><td>${name.lastname}</td>`
	}
	data += '</table></body></html>'
	return data
}

function getJson(names) {
	return names
}

function getXml(names) {
	return js2xmlparser.parse('people', names)
}

app.use(router.routes())
module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
