
'use strict'

const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const app = express()
app.use(express.static('public'))

app.engine('html', es6Renderer)
app.set('views', 'html')
app.set('view engine', 'html')

const publicDir = express.static('public')
app.use(publicDir)

const bodyParser = require('body-parser')
const parser = bodyParser.urlencoded({ extended: true })
app.use(parser)

const sqlite3 = require('sqlite3').verbose()

const port = 8080
const DBName = 'todo'

const db = new sqlite3.Database(`./${DBName}.db`, (err) => {
	if (err) return console.error(err.message)
	console.log(`Connected to the "${DBName}" SQlite database.`)
	const sql = 'CREATE TABLE IF NOT EXISTS items(list text, item text)'
	console.log(sql)
	db.run(sql)
})

app.get('/', (req, res) => {
	const item = req.query.item
	console.log(`adding "${item}"`)
	const list = req.query.list ? req.query.list : 'main'
	const sql = `INSERT INTO items(list, item) VALUES("${list}", "${item}")`
	console.log(sql)
	db.run(sql, err => {
		console.log(`inserting ${item} into database`)
		if(err) console.error(`error: ${err.message}`)
		if(!err) console.log(`added ${item}`)
	})
	const data = {
		title: 'My First Template'
	}
	console.log(`adding ${item} to the ${req.query.list} list`)
	if(req.query.list) {
		data.list = req.query.list
	} else {
		data.list = 'main'
	}
	const sqlSelect = `SELECT item FROM items WHERE list = "${data.list}"`
	console.log(sqlSelect)
	db.all(sqlSelect, (err, rows) => {
		if(err) console.error(err.message)
		data.items = rows.map( row => `<li>${row.item}</li>`).join('')
		//console.log(data)
		res.render('index', {locals: data})
	})
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
