
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

const sqlite3 = require('sqlite3-promise')

const port = 8080
const DBName = 'todo'

const status = {
	'serverError': 500
}

app.get('/', async(req, res) => {
	try {
		const db = new sqlite3.Database(`${DBName}.db`)
		await runAsync('CREATE TABLE IF NOT EXISTS items(list text, item text)')
		const list = req.query.list ? req.query.list : 'main'
		if(req.query.item) {
			const item = req.query.item
			console.log(`adding "${item}"`)
			await db.runAsync(`INSERT INTO items(list, item) VALUES("${list}", "${item}")`)
		}
		const rows = await db.allAsync(`SELECT item FROM items WHERE list = "${list}"`)
		const data = {
			title: 'My First Template',
			list: list,
			items: rows.map( row => `<li>${row.item}</li>`).join('')
		}
		res.render('index', {locals: data})
	} catch(err) {
		res.status(status.serverError)
		res.send(`ERROR: ${err.message}`)
	}
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})

const runAsync = sql => new Promise( (resolve, reject) => {
	const db = new sqlite3.Database(`${DBName}.db`)
	db.run(sql, err => {
		if(err) return reject(new Error(err.message))
		resolve()
	})
	db.close()
})
