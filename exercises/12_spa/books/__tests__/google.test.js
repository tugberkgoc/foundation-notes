
'use strict'

/* eslint-disable no-magic-numbers */

const google = require('../modules/google')


describe('searchString', () => {

	test('check response is valid', async() => {
		const data = await google.search('java')
		expect(typeof data).toBe('string')
		const json = JSON.parse(data)
		expect(Array.isArray(json.items)).toBeTruthy()
		expect(json.items.length).toBe(20)
	})

})
