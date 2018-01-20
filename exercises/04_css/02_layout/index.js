
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const port = 8080

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/html/boxmodel.html`)
})

app.get('/boxmodel', (req, res) => {
	res.sendFile(`${__dirname}/html/boxmodel.html`)
})

app.get('/columns', (req, res) => {
	res.sendFile(`${__dirname}/html/columns.html`)
})

app.get('/floating', (req, res) => {
	res.sendFile(`${__dirname}/html/floating.html`)
})

app.get('/menu', (req, res) => {
	res.sendFile(`${__dirname}/html/menu.html`)
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
