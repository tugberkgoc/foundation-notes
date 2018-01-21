#!/usr/bin/env node
/* eslint no-magic-numbers: 0 */

'use strict'

const sync = require('sync-request')

let home

exports.setHome = (location, callback) => {
	//const loc = getLatLon(location)
	home = getLatLon(location)
	const latLng = home.split(',')
	callback({lat: parseFloat(latLng[0]), lng: parseFloat(latLng[1])})
}

exports.getFare = function(destination, callback) {
	const dest = getLatLon(destination)
	const data = getRouteData(home, dest) // this is making the live API call
	const distance = data.routes[0].legs[0].distance.value
	const duration = data.routes[0].legs[0].duration.value
	const cost = calculateFare(distance, duration)
	callback({distance: distance, duration: duration, cost: parseFloat(cost)})
}

/* this function returns API data but the data won't vary between calls. We could get away without mocking this call. */
function getLatLon(address) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?region=uk&address=${address}`
	console.log(url)
	const res = sync('GET', url)
	const data = JSON.parse(res.getBody().toString('utf8'))
	const loc = data.results[0].geometry.location
	return `${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}`
}

/* this function also returns live API data but this data will vary continously based on time of day and traffic conditions. This means it will require mocking in tests. by storing the function in a private variable we can substitute for a different function when testing. Because we are replacing the code block it will never be called by our test suite so we flag the code coverage tool to ignore it. */
/* istanbul ignore next */
const getRouteData = function(start, end) {
	const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}`
	console.log(url)
	const res = sync('GET', url)
	return JSON.parse(res.getBody().toString('utf8'))
}

function calculateFare(distance, duration) {
	console.log(`distance: ${distance}km, duration: ${duration} min`)
	const cost = distance/127*0.2
	return cost.toFixed(2)
}
