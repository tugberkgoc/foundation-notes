
'use strict'

const express = require('express')
const app = express()

//add handlebars view engine
const handlebars = require('express3-handlebars')
	.create({defaultLayout: 'main'}) //default handlebars layout page

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
	const food = ['bread', 'butter', 'jam']
	res.render('food', {myFood: food})
})

app.listen(port, () => console.log(`app listening on port ${port}`))
