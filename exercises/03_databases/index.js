#!/usr/bin/env node

'use strict'

const express = require('express')
const app = express()

const port = 8080

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./bookshop.db', (err) => {
	if (err) return console.error(err.message)
	console.log('Connected to the "bookshop.db" SQlite database.')
})

app.get('/', (req, res) => {
	const sql = 'SELECT id, title FROM books;'
	console.log(sql)
	db.all(sql, (err, data) => {
		if(err) console.error(err.message)
		console.log(data)
		for(const book of data) {
			res.write(`${book.title}\n`)
		}
		res.end()
	})
})

app.get('/books', (req, res) => {
	const searchString = req.query.q
	console.log(`searchString: ${searchString}`)
	const sql = `SELECT id, title FROM books WHERE title LIKE "%${searchString}%";`
	console.log(sql)
	db.all(sql, (err, data) => {
		if(err) console.error(err.message)
		console.log(data)
		for(const book of data) {
			res.write(`${book.title}\n`)
		}
		res.end()
	})
})

app.get('/details/:id', (req, res) => {
	const bookID = req.params.id
	console.log(bookID)
	const sql = `SELECT * FROM books WHERE id = ${bookID};`
	console.log(sql)
	db.get(sql, (err, data) => {
		if(err) console.error(err.message)
		console.log(data)
		res.write(`${data.title}\n\t`)
		res.write(`${data.description}\n`)
		res.end()
	})
})

app.listen(port, () => console.log(`app listening on port ${port}`))
