
'use strict'

const express = require('express')
const app = express()

const handlebars = require('express3-handlebars').create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

const port = 8080

app.get('/', (req,res) => {
	res.render('home')
})

app.get('/date', (req, res) => {
	const d = new Date()
	const date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
	const data = {
		title: 'My First Template',
		today: date
	}
	res.render('date', data)
})

app.get('/food', (req, res) => {
	const food = [
		{name: 'bread', qty: 5},
		{name: 'butter', qty: 2},
		{name: 'jam', qty: 1},
		{name: 'cheese', qty: 4}
	]
	res.render('food', {myFood: food})
})

app.listen(port, () => console.log(`app listening on port ${port}`))
