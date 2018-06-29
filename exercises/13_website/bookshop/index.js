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

const sqlite3 = require('sqlite3').verbose()

const port = 8080

const db = new sqlite3.Database(`./bookshop.db`, (err) => {
	if (err) return console.error(err.message)
	console.log(`Connected to the "bookshop.db" SQlite database.`)
})

app.get('/', async(req, res) => {
	const sql = 'SELECT id, title FROM books;'
	console.log(sql)
	db.all(sql, (err, data) => {
		if(err) console.error(err.message)
		console.log(data)
		let list = '<ol>'
		for(const book of data) {
			console.log(book.title)
			list += `<li>${book.title}</li>`	
		}
		list += '</ol>'
		console.log(list)
		res.render('index', {locals: {books: list}})
	})
})

app.listen(port, () => console.log(`app listening on port ${port}`))
