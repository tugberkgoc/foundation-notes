
'use strict'

/* eslint-disable no-magic-numbers */

const books = require('../modules/books')

jest.mock('../modules/google')

describe('buildString', () => {

	test('build url with default count', () => {
		const str = books.buildString('java')
		expect(str)
			.toBe('https://www.googleapis.com/books/v1/volumes?maxResults=20&fields=items(id,volumeInfo(title,industryIdentifiers))&q=java')
	})

	test('build url specifying count', () => {
		const str = books.buildString('java', 2)
		expect(str)
			.toBe('https://www.googleapis.com/books/v1/volumes?maxResults=2&fields=items(id,volumeInfo(title,industryIdentifiers))&q=java')
	})

	test('throw error if count too large', () => {
		expect(() => books.buildString('java', 21))
			.toThrowError('invalid count parameter')
	})

	test('throw error if count 0', () => {
		expect(() => books.buildString('java', 0))
			.toThrowError('invalid count parameter')
	})

	test('throw error if count negative', () => {
		expect(() => books.buildString('test', -1))
			.toThrowError('invalid count parameter')
	})

})

describe('searchGoogle', () => {

	test('make a simple API call', async () => {
		const search = 'java'
		const data = await books.searchGoogle(search)
		console.log(data.entity)
	})
})
