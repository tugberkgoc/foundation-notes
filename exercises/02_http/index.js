
'use strict'

const fs = require('fs')
const js2xmlparser = require('js2xmlparser')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const port = 8080
const minLength = 3

const status = {
	ok: 200,
	created: 201,
	notFound: 404,
	notAcceptable: 406,
	conflict: 409
}

const names = []

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.sendFile(`${__dirname}/hello.html`)
})

app.get('/animal/:name', (req, res) => {
	console.log(req.params.name)
	fs.exists(`public/${req.params.name}.png`, exists => {
		if (exists) {
			console.log(`found ${req.params.name}.png`)
			res.setHeader('content-type', 'image/png')
			console.log('sending file')
			const filename = `${__dirname}/public/${req.params.name}.png`
			console.log(filename)
			res.sendFile(filename)
		} else {
			console.log('not found!')
			res.status(status.notFound).send('Animal Not found')
		}
	})
})

app.get('/form', (req, res) => {
	res.sendFile(`${__dirname}/form.html`)
})

app.post('/form', (req, res) => {
	console.log('processing the file')
	if(req.body.firstname.length >= minLength && req.body.lastname.length >= minLength) {
		names.push( { firstname: req.body.firstname, lastname: req.body.lastname } )
		res.status(status.created).send(`your name is ${req.body.firstname} ${req.body.lastname}`)
	}
})

app.get('/names', (req, res) => {
	let list = names
	let search = 'x'

	if(req.query.search && req.query.search.length >= minLength) {
		console.log(`found query parameter: ${req.query.search}`)
		search = req.query.search.toLowerCase()
	} else if(req.headers.search && req.headers.search.length >= minLength) {
		console.log(`found header: ${req.headers.search}`)
		search = req.headers.search.toLowerCase()
	}

	console.log(req.headers.accepts)

	if(search.length >= minLength) {
		console.log(`you are searching for '${search}'`)
		console.log(search)
		list = names.filter( val => `${val.firstname} ${val.lastname}`.toLowerCase().includes(search))
	}
	if(list.length === 0) {
		res.status(status.notFound).send('No Names found')
		return
	}
	console.log()
	res.format({
		'text/csv': () => {
			res.setHeader('content-type', 'text/csv')
			for(const name of list) {
				res.write(`${name.firstname}, ${name.lastname}`)
			}
			res.end()
		},
		'text/html': () => {
			console.log('text/html requested')
			res.setHeader('content-type', 'text/html')
			console.log(names)
			res.write('<html><head><link rel="stylesheet" href="main.css"/></head><body><table>')
			for(const name of list) {
				console.log(name)
				res.write(`<tr><td>${name.firstname}</td><td>${name.lastname}</td>`)
			}
			res.write('</table></body></html>')
			res.end()
		},
		'application/json': () => {
			console.log('application/json requested')
			res.setHeader('content-type', 'application/json')
			res.status(status.ok).send(list)
		},
		'application/xml': () => {
			console.log('application/xml requested')
			res.setHeader('content-type', 'application/xml')
			res.status(status.ok).send(js2xmlparser.parse('people', list))
		},
		default: () => {
			res.status(status.notAcceptable).send('unsupported MIME type')
		}
	})
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
