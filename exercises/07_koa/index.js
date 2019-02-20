#!/usr/bin/env node

const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const stat = require('koa-static')
const fs = require('fs')

const app = new Koa()
const router = new Router()
app.use(stat('public'))
app.use(views(`${__dirname}/views`, { extension: 'html' }, {map: { handlebars: 'handlebars' }}))
app.use(router.routes())

const port = 8080

router.get('/', async ctx => await ctx.render('hello'))

router.get('/books', ctx => {
	getBooks( (err, data) => {
		if(err) ctx.body = err
		let html = '<ol>'
		data.books.forEach( item => {
			html += `<li>${item}</li>`
		})
		html += '</ol>'
		ctx.body = html
	})
})

function getBooks(callback) {
	fs.readFile('books.json', 'utf8', (err, data) => {
		if(err) callback('Could Not Find File')
		const books = JSON.parse(data)
		console.log(books)
		callback(null, books)
	})
}

module.exports = app.listen(port, () => console.log(`listening on port ${port}`))
