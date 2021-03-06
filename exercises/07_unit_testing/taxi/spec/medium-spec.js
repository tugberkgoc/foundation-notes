#!/usr/bin/env node
/* eslint no-magic-numbers: 0 */

'use strict'

//const fs = require('fs')
const rewire = require('rewire')
const taxi = rewire('../modules/taxi')

describe('Medium Length Route', () => {

	/* the routedata comes from an external API that is not guaranteed to return consistent data. We substitute a different function for testing that returns a fixed object. */
	/*taxi.__set__('getRouteData', function(start, end) {
		console.log('MOCK 1')
		const data = fs.readFileSync('spec/routedata/cov_war_uni.json', "utf8")
		return JSON.parse(data)
	})*/

	it('should set Gulson Road, Coventry as the current location', done => {
		taxi.setHome('Gulson Road, Coventry', data => {
			expect(data.lat).toEqual(52.405899)
			expect(data.lng).toEqual(-1.495929)
			done()
		})
	})

	it('should calculate the fare to University Road, Coventry', done => {
		taxi.getFare('University Road, Coventry', data => {
			expect(data.distance).toEqual(7123)
			expect(data.duration).toEqual(767)
			expect(data.cost).toEqual(11.22)
			done()
		})
	})

})
