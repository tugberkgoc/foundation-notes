
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const port = 8080

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/html/hello.html`)
})

app.get('/test', (req, res) => {
	res.sendFile(`${__dirname}/html/csstest.html`)
})

app.get('/comparison', (req, res) => {
	res.sendFile(`${__dirname}/html/comparison.html`)
})

app.get('/hello', (req, res) => {
	res.sendFile(`${__dirname}/html/hello-world.html`)
})

app.get('/selectors', (req, res) => {
	res.sendFile(`${__dirname}/html/selectors.html`)
})

app.get('/targets', (req, res) => {
	res.sendFile(`${__dirname}/html/targets.html`)
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
