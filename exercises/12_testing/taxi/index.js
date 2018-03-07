#!/usr/bin/env node

'use strict'

const taxi = require('./modules/taxi')


console.time('set ecb as home')
taxi.setHome('Gulson Road, Coventry', data => {
	console.log('Setting ECB as home')
	console.log(data)
	console.log(data.lat)
	console.timeEnd('set ecb as home')
})

console.time('standard fare')
taxi.getFare('University Road, Coventry', data => {
	console.log(data)
	console.timeEnd('standard fare')
})

console.time('set cathedral as home')
taxi.setHome('Coventry Cathedral', data => {
	console.log('Coventry Cathedral')
	console.log(data)
	console.log(data.lat)
	console.timeEnd('set cathedral as home')
})

console.time('long fare');
taxi.getFare('Warwick Castle', data => {
	console.log(data)
	console.timeEnd('long fare')
})

console.time('short fare')
taxi.getFare('Broadgate, Coventry', data => {
	console.log(data)
	console.timeEnd('short fare')
})
