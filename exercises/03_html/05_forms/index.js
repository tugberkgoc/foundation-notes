
'use strict'

const express = require('express')
const app = express()
app.use(express.static('public'))

const port = 8080

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})

app.post('/', (req, res) => {

	console.log(req.body)

	const data = req.body
	res.write('<h2>Data in Body</h2>')
	res.write('<html><body><table>')
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
