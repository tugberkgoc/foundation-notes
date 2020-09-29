#!/usr/bin/env node

'use strict'

const request = require('request')

const apiKey = '44c39f3fa462f86b3fc88f5678e5c5ff'
const cityName = 'coventry,uk'

request(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`, (err, response, body) => {
	if(err) console.log(err.message)
	console.log(`the body variable contains a ${typeof body}`)
	const data = JSON.parse(body)
	console.log(`the data variable contains an ${typeof data}`)
	console.log(data)
	
	request(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`, (err, response, body) => {
		if(err) console.log(err.message)
		const data = JSON.parse(body)
		console.log(data)
	})
})