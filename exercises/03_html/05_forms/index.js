
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const port = 8080

app.get('/postform', (req, res) => {
	res.sendFile(`${__dirname}/html/post.html`)
})

app.get('/getform', (req, res) => {
	res.sendFile(`${__dirname}/html/get.html`)
})

app.get ('/lists', (req, res) => {
	res.sendFile(`${__dirname}/html/lists.html`)
})

app.get ('/semantic', (req, res) => {
	res.sendFile(`${__dirname}/html/form-skel.html`)
})

// this route processes data in the querystring
app.get('/', (req, res) => {
	res.write('<html><body><h1>Retrieving Data in Querystring</h1><table>')
	for (const param in req.query) {
		res.write(`<tr><td>${param}</td><td>${req.query[param]}</td></tr>`)
 	}
	res.write('</table></body></html>')
})

// this route processes data in the request body
app.post('/', (req, res) => {

	console.log(req.body)

	const data = req.body
	res.write('<html><body><h2>Retrieving Data in Body</h2><table>')
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			console.log(key)
			console.log(data[key])
			res.write(`<tr><td>${key}</td><td>${data[key]}</td></tr>`)
		}
	}
	res.write('</table></body></html>')
	res.end()
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
