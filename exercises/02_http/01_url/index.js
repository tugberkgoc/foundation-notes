
'use strict'

const express = require('express')
const app = express()
const port = 8080

function hello(req, res) {
	res.send('Hello World')
}

app.get('/', hello)

app.get('/hello', hello)

app.get('/anon', (req, res) => {
	res.send('Hello World')
})

const books = ['The Hobbit', 'Alice in Wonderland', 'The Secret Garden']

app.get('/books/:index', (req, res) => {
	const parameters = req.params
	console.log(parameters)
	const title = books[parameters.index]
	res.send(title)
})

app.get('/name', (req, res) => {
	const queryStrings = req.query
	console.log(queryStrings)
})

app.get('/hello/:name', (req, res) => {
	console.log(req.params)
	let myname = req.params.name
	if(req.query.format === 'upper') myname = myname.toUpperCase()
	console.log(`myname: ${myname}`)
	res.send(`hello ${myname}`)
})



app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
