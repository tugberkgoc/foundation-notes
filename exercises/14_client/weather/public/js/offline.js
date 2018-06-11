
'use strict'

const status = {
	'OK': 200
}
const xmlStatus = {
	notInitialized: 0,
	connected: 1,
	received: 2,
	processing: 3,
	ready: 4
}

const milli = 1000

console.log('page loaded')

const APIKey = '44c39f3fa462f86b3fc88f5678e5c5ff'

const url = `http://api.openweathermap.org/data/2.5/forecast?&mode=json&APPID=${APIKey}&q=`

document.querySelector('input').onkeyup = search

function search() {
	console.log('search')
	const criteria = document.querySelector('input').value
	const xhr = new XMLHttpRequest()
	xhr.open('GET', `${url}${criteria}`, true)
	xhr.onload = () => {
		console.log('connected')
		if (xhr.readyState === xmlStatus.ready && xhr.status === status.OK) {
			const data = JSON.parse(xhr.responseText)
			if (data.cod === '404') {
				console.log('city not found')
			} else if (data.cod === '200') {
				console.log('city found')
				const forecast = data.list
				const weather = []
				for (let i=0; i<forecast.length; i++) {
					const date = new Date(forecast[i].dt * milli).toUTCString()
					const desc = forecast[i].weather[0].description
					const entry = {date: date, description: desc}
					weather.push(entry)
				}
				sessionStorage[criteria] = JSON.stringify(
					{
						city: data.city.name,
						country: data.city.country,
						weather: weather
					}
				)
				console.log(JSON.parse(sessionStorage[criteria]).city)
				console.log(JSON.parse(sessionStorage[criteria]).country)
			}
		}
	}
	xhr.onerror = () => {
		console.log('Not Connected')
		if (sessionStorage[criteria]) {
			console.log(JSON.parse(sessionStorage[criteria]).city)
			console.log(JSON.parse(sessionStorage[criteria]).country)
		} else {
			console.log('city not found')
		}
	}
	xhr.send()
}
