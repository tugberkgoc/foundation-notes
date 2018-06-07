
'use strict'

/* eslint-disable no-magic-numbers */

const utility = require('../modules/utility')

describe('buildString', () => {

	test('build url with default count', () => {
		const str = utility.buildString('java')
		expect(str)
			.toBe('https://www.googleapis.com/books/v1/volumes?maxResults=20&fields=items(id,volumeInfo(title,industryIdentifiers))&q=java')
	})

	test('build url specifying count', () => {
		const str = utility.buildString('java', 2)
		expect(str)
			.toBe('https://www.googleapis.com/books/v1/volumes?maxResults=2&fields=items(id,volumeInfo(title,industryIdentifiers))&q=java')
	})

	test('throw error if count too large', () => {
		expect(() => utility.buildString('java', 21))
			.toThrowError('invalid count parameter')
	})

	test('throw error if count 0', () => {
		expect(() => utility.buildString('java', 0))
			.toThrowError('invalid count parameter')
	})

	test('throw error if count negative', () => {
		expect(() => utility.buildString('test', -1))
			.toThrowError('invalid count parameter')
	})

})