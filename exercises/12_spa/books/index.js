#!/usr/bin/env node

'use strict'

const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('html', es6Renderer)
app.set('views', 'html')
app.set('view engine', 'html')

const books = require('./modules/books')

const port = 8080

// const status = {
// 	ok: 200,
// 	created: 201,
// 	notFound: 404,
// 	notAcceptable: 406,
// 	conflict: 409
// }

app.get('/', async(req, res) => {
	try {
		console.log(`query ${req.query.q}`)
		const bookList = await books.search(req)
		console.log(bookList)
		res.render('index', {locals: {books: bookList}})
	} catch(err) {
		console.log(err.message)
	}
})

app.listen(port, () => console.log(`app listening on port ${port}`))
