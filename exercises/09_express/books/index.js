#!/usr/bin/env node

'use strict'

//const fs = require('fs')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('html', es6Renderer)
app.set('views', 'html')
app.set('view engine', 'html')

const books = require('./books')

const port = 8080

const status = {
	ok: 200,
	created: 201,
	notFound: 404,
	notAcceptable: 406,
	conflict: 409
}

app.get('/', (req, res) => {
	books.searchByString(req, (err, data) => {
		if(err) res.status(status.notFound).send('AN ERROR OCCURRED')
		if(req.query.q === undefined) req.query.q = ''
		res.render('index', {locals: {query: req.query.q, books: data}})
	})
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
