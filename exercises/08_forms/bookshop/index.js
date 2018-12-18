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

app.get('/', async(req, res) => {
	const sql = 'SELECT id, title FROM books;'
	console.log(sql)
	db.all(sql, (err, data) => {
		if(err) console.error(err.message)
		console.log(data)
		res.render('home', {books: data})
	})
})

/* app.get('/', async(req, res) => {
	let sql = 'SELECT id, title FROM books;'
	// --------
	let q = ''
	console.log(req.query.q)
	if(req.query !== undefined && req.query.q !== undefined) {
		sql = `SELECT id, title FROM books 
						WHERE upper(title) LIKE upper("%${req.query.q}%") 
						OR upper(description) LIKE upper("%${req.query.q}%");`
		q = req.query.q
	}
	// --------
	db.all(sql, (err, data) => {
		if(err) console.error(err.message)
		let list = '<ol>'
		for(const book of data) list += `<li>${book.title}</li>`
		list += '</ol>'
		// --------
		res.render('newindex', {locals: {books: list, query: q}})
		// --------
	})
}) */

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

app.get('/form', async(req, res) => {
	res.sendFile(`${__dirname}/html/form.html`)
})

app.post('/add', async(req, res) => {
	console.log(req.body)
	const sql = `INSERT INTO books(title, isbn, description)
								VALUES("${req.body.title}", "${req.body.isbn}", "${req.body.description}");`
	console.log(sql)
	db.run(sql, err => {
		if(err) console.error(err.message)
		res.redirect('/')
	})
})

app.listen(port, () => console.log(`app listening on port ${port}`))
