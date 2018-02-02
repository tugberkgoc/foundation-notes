
'use strict'

const express = require('express')
const app = express()

const marked = require('marked')
const fs = require('fs')

const port = 8080

app.get('/', (req, res) => {
	fs.readFile(`${__dirname}/computers.md`, 'utf8', (err, data) => {
		if(err) {
			console.log(err)
		}
		res.send(marked(data.toString()))
	})
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
