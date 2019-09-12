
const express = require('express')
const app = express()

const port = 8080

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/html/computers80.html`)
})

app.get('/commodore', (req, res) => {
	res.sendFile(`${__dirname}/commodore64.html`)
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
