#!/usr/bin/env node

'use strict'

const request = require('request')

const url = 'https://api.openweathermap.org/data/2.5/weather?q=coventry,uk&appid=44c39f3fa462f86b3fc88f5678e5c5ff'

request(url, (err, response, body) => {
	if(err) console.log(err.message)
	console.log(`the body variable contains a ${typeof body}`)
	const data = JSON.parse(body)
	console.log(`the data variable contains an ${typeof data}`)
	console.log(data)
})
