
'use strict'

const express = require('express')
const app = express()
app.use(express.static('public'))

const port = 8080

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})

app.get('/paradoxes', (req, res) => {
	res.sendFile(`${__dirname}/html/paradoxes.html`)
})

app.get('/date', (req, res) => {
	const today = new Date()
	const dd = today.getDate()
	const mm = today.getMonth()+1
	const yyyy = today.getFullYear()
	res.send(`<h1>The date is: ${dd}/${mm}/${yyyy}`)
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
