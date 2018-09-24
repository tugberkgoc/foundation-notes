#!/usr/bin/env node

'use strict'

const express = require('express')

const handlebars = require('express3-handlebars').create({defaultLayout: 'main'})
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

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
		res.render('home', {books: data})
	})
})

app.get('/details/:id', (req, res) => {
	console.log(req.params.id)
	const sql = `SELECT * FROM books WHERE id = ${req.params.id};`
	console.log(sql)
	db.get(sql, (err, data) => {
		if(err) console.error(err.message)
		console.log(data)
		res.render('details', data)
	})
})

app.listen(port, () => console.log(`app listening on port ${port}`))
