
'use strict'

const express = require('express')
const app = express()

const publicDir = express.static('public')
app.use(publicDir)

const bodyParser = require('body-parser')
const parser = bodyParser.urlencoded({ extended: true })
app.use(parser)

const port = 8080

const items = []

app.get('/', (req, res) => {
	const search = req.query.search
	console.log(`you searched for '${search}'`)
	res.header('Content-Type', 'text/html')
	res.write('<html><body><p><a href="/form">View form</a></p></body></html>')
	res.end()
})

app.get('/form', (req, res) => {
	res.sendFile(`${__dirname}/html/index.html`)
})

app.post('/', (req, res) => {
	const accept = req.headers.accept
	console.log(accept)
	const item = req.body.item
	console.log(`adding ${item}`)
	items.push(item)
	for(let i = 0; i< items.length; i++) {
		console.log(`${i}: ${items[i]}`)
	}
	res.redirect('/')
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
