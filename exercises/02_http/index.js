
'use strict'

const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const port = 8080

const status = {
	ok: 200,
	created: 201,
	notFound: 404
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
			// file found, return it
			res.setHeader('content-type', 'image/png')
			console.log('sending file')
			const filename = `${__dirname}/public/${req.params.name}.png`
			console.log(filename)
			res.sendFile(filename)
			// set data type as well
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
	names.push( { firstname: req.body.firstname, lastname: req.body.lastname } )
	res.status(status.created).send(`your name is ${req.body.firstname} ${req.body.lastname}`)
})

app.get('/names', (req, res) => {
	// request headers (accepts).
	// query bits to change order, etc.
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
