
'use strict'

const express = require('express')
const app = express()
app.use(express.static('public'))

const port = 8080

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.sendFile(`${__dirname}/hello.html`)
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
