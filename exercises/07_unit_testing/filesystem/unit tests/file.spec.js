
'use strict'

const File = require('../modules/file.js')
const mock = require('mock-fs')

beforeAll( async() => {
	mock({
		'data': {
			'test.json': '["item": "bread", "qty": 42]'
		}
	})
})

describe('xxx', () => {

	beforeEach( async() => {
		const file = new File()
	})
	afterEach( async() => {
		// runs after each test completes
	})
	test('xxx', async done => {
		expect.assertions(1)
		try {
			// XXX
		} catch(err) {
			// XXX
		} finally {
			done()
		}
	})
})
