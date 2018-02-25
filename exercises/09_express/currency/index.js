
'use strict'

const fs = require('fs')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const request = require('request')

app.engine('html', es6Renderer)
app.set('views', 'html')
app.set('view engine', 'html')

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

app.get('/:base', (request, response) => {
	console.log('/')
	console.log(request.params)
	const base = request.params.base.toUpperCase()
	//console.log(base)
	const url = `http://api.fixer.io/latest?base=${base}`
	request.get(url, (err, res, body) => {
		if (err) console.log(err.message)
		const json = JSON.parse(body)
		//console.log(typeof data)
		//console.log(JSON.stringify(data, null, 2))
		const rates = json.rates
		const data = {
			base: base,
			rates: rates
		}
		console.log(data)
		res.render('index', {locals: data})
		res.end()
	})
})

/* handling rows of data.
${features.map(f => `
    <dt>${f.dt}</dt>
    <dd>${f.dd}</dd>
  `).join('')}
*/

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

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
