
'use strict'

const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const app = express()
app.use(express.static('public'))

app.engine('html', es6Renderer)
app.set('views', 'html')
app.set('view engine', 'html')

const port = 8080

app.get('/', (req, res) => {
	const d = new Date()
	const date = `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()}`
	const data = {
		title: 'My First Template',
		date: date
	}
	res.render('index', {locals: data})
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
