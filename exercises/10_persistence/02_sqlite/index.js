
'use strict'

const express = require('express')
const app = express()

const publicDir = express.static('public')
app.use(publicDir)

const bodyParser = require('body-parser')
const parser = bodyParser.urlencoded({ extended: true })
app.use(parser)

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./bookshop.db', (err) => {
	if (err) return console.error(err.message)
	console.log('Connected to the in-memory SQlite database.')
	db.run('CREATE TABLE IF NOT EXISTS books(isbn text)')
})

db.close((err) => {
	if (err) return console.error(err.message)
	console.log('Close the database connection.')
})

const port = 8080

//TODO: routes for the bookshop

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})