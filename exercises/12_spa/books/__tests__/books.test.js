
'use strict'

/* eslint-disable no-magic-numbers */

const books = require('../books')

describe('buildString', () => {

	test('build url with default count', () => {
		const str = books.buildString('test')
		expect(str)
			.toBe('https://www.googleapis.com/books/v1/volumes?maxResults=20&fields=items(id,volumeInfo(title,industryIdentifiers))&q=test')
	})

	test('build url specifying count', () => {
		const str = books.buildString('test', 2)
		expect(str)
			.toBe('https://www.googleapis.com/books/v1/volumes?maxResults=2&fields=items(id,volumeInfo(title,industryIdentifiers))&q=test')
	})

	test('throw error if count too large', () => {
		expect(() => books.buildString('test', 21))
			.toThrowError('invalid count parameter')
	})

	test('throw error if count 0', () => {
		expect(() => books.buildString('test', 0))
			.toThrowError('invalid count parameter')
	})

	test('throw error if count negative', () => {
		expect(() => books.buildString('test', -1))
			.toThrowError('invalid count parameter')
	})

})

describe('searchGoogle', () => {

})
