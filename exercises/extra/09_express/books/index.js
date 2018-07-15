#!/usr/bin/env node

'use strict'

//const fs = require('fs')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const request = require('request')

app.engine('html', es6Renderer)
app.set('views', 'html')
app.set('view engine', 'html')

const books = require('./books')

const port = 8080
const minLen = 3

const status = {
	ok: 200,
	created: 201,
	notFound: 404,
	notAcceptable: 406,
	conflict: 409
}

app.get('/bad', (reqst, response) => {
	if(reqst.query.q === undefined) reqst.query.q = ''
	if(!reqst.query.q || reqst.query.q.length <= minLen) {
		response.render('index', {locals: {route: 'bad', query: reqst.query.q, books: []}})
	}
	const query = reqst.query.q
	const base = 'https://www.googleapis.com/books/v1/volumes'
	const fields = 'items(id,volumeInfo(title,industryIdentifiers))'
	const count = 40
	const url = `${base}?maxResults=${count}&fields=${fields}&q=${query}`
	console.log(url)
	request.get(url, (err, res, body) => {
		if (err) response.status(status.notFound).send('<h1>An error has ocurred</h1>')
		const data = JSON.parse(body)
		const books = data.items.map( item => {
			let id = ''
			if (item.volumeInfo.industryIdentifiers) {
				id = item.volumeInfo.industryIdentifiers[0].identifier
			}
			return {title: item.volumeInfo.title, isbn: id, id: item.id}
		})
		response.render('index', {locals: {route: 'bad', query: reqst.query.q, books: books}})
	})
})

app.get('/good', (req, res) => {
	books.searchByString(req, (err, data) => {
		if(err) res.status(status.notFound).send('AN ERROR OCCURRED')
		if(req.query.q === undefined) req.query.q = ''
		res.render('index', {locals: {route: 'good', query: req.query.q, books: data}})
	})
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
