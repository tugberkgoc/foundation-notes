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

const port = 8080

const sqlite3 = require('sqlite3').verbose()

const bcrypt = require('bcrypt')
const saltRounds = 10

const session = require('express-session')
const FileStore = require('session-file-store')(session)
app.use(session({
	name: 'server-session-cookie-id',
	secret: 'my express secret',
	saveUninitialized: true,
	resave: true,
	store: new FileStore()
}))

app.use( (req, res, next) => {
	console.log('req.session', req.session)
	return next()
})

const db = new sqlite3.Database('./auth.db', err => {
	if (err) return console.error(err.message)
	console.log('Connected to the SQlite database.')
})

app.get('/', (req, res) => {
	if(!req.session.authenticated) return res.redirect('/login')
	res.sendFile(`${__dirname}/html/index.html`)
})

app.get('/register', (req, res) => res.sendFile(`${__dirname}/html/register.html`))

app.post('/register', (req, res) => {
	console.log(req.body)
	bcrypt.hash(req.body.pass, saltRounds, (err, hash) => {
		if(err) console.error(err.message)
		req.body.pass = hash
		console.log(req.body)
		const sql = `INSERT INTO users(name, username, email, password) 
			VALUES("${req.body.name}", "${req.body.user}", "${req.body.email}", "${req.body.pass}")`
		console.log(sql)
		db.run(sql, err => {
			if(err) console.error(err.message)
			return res.redirect('/')
		})
	})
})

app.get('/login', (req, res) => res.sendFile(`${__dirname}/html/login.html`))

app.post('/login', (req, res) => {
	if(req.body.pass === '') req.body.pass = ' '
	const sql = `SELECT count(id) AS count FROM users WHERE username="${req.body.user}";`
	db.get(sql, (err, data) => {
		if(err) console.error(err.message)
		if(!data.count) return res.redirect('/login?message=invalid%20username')
		const sql2 = `SELECT password FROM users WHERE username = "${req.body.user}";`
		db.get(sql2, (err, data) => {
			if(err) console.error(err.message)
			bcrypt.compare(req.body.pass, data.password, (err, data) => {
				if(err) console.error(err.message)
				if(data === true) req.session.authenticated = true
				return res.redirect('/')
			})
		})
	})
})

app.get('/logout', (req, res) => {
	delete req.session.authenticated
	return res.redirect('/')
})

app.listen(port, () => console.log(`app listening on port ${port}`))
