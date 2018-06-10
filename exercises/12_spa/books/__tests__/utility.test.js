
'use strict'

/* eslint-disable no-magic-numbers */

const fs = require('fs')

const utility = require('../modules/utility')

const path = './modules/__mocks__/__mockData__/'

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

describe('buildBookURL', () => {

	test('build url with valid isbn13 number', () => {
		const str = utility.buildBookURL(9780226285108)
		expect(str)
			.toBe('https://www.googleapis.com/books/v1/volumes?fields=items(volumeInfo(title,authors,description,publisher))&q=isbn:9780226285108')
	})

	test('passing isbn as a string', () => {
		expect(() => utility.buildBookURL('9780226285108'))
			.toThrowError('parameter has invalid data type')
	})

	test('passing isbn number that is too long', () => {
		expect(() => utility.buildBookURL(97802262851081))
			.toThrowError('invalid isbn')
	})

	test('passing isbn number that is too short', () => {
		expect(() => utility.buildBookURL(978022628510))
			.toThrowError('invalid isbn')
	})

})

describe('extractFields', () => {

	let goodData

	beforeAll( () => {
		goodData = fs.readFileSync(`${path}java.json`, 'utf8')
		expect(typeof goodData).toBe('string')
	})

	test('extracted data is in an array', () => {
		const bookData = utility.extractFields(goodData)
		expect(Array.isArray(bookData)).toBeTruthy()
		expect(bookData.length).toBe(20)
	})

	test('passing string without books array', () => {
		expect(() => utility.extractFields('{"name": "Mark"}'))
			.toThrowError('no book data found')
	})

	test('passing object instead of string', () => {
		expect(() => utility.extractFields({name: 'Mark'}))
			.toThrowError('parameter has invalid data type')
	})

	test('extract title fields', () => {
		const bookData = utility.extractFields(goodData)
		expect(bookData[0].title).toBe('Thinking in Java')
		expect(bookData[1].title).toBe('Practical Java')
	})

	test('extract ISBN13 data', () => {
		const bookData = utility.extractFields(goodData)
		expect(bookData[0].isbn).toBe(9780131002876)
		expect(bookData[1].isbn).toBe(9780201616460)
	})

})

describe('build table string', () => {

	let goodData
	let goodHTML

	beforeAll( () => {
		goodData = JSON.parse(fs.readFileSync(`${path}extractedData.json`, 'utf8'))
		goodHTML = fs.readFileSync(`${path}validTable.txt`, 'utf8')
	})

	test('check parameter is an object', () => {
		expect(typeof goodData).toBe('object')
	})

	test('thow error if parameter is not an object', () => {
		expect(() => utility.buildTable('bad parameter'))
			.toThrowError('invalid parameter data type')
	})

	test('check that parameter is an array (not object)', () => {
		expect(() => utility.buildTable({name: 'Mark'}))
			.toThrowError('invalid parameter data type')
	})

	test('check the function returns a string', () => {
		const table = utility.buildTable(goodData)
		expect(typeof table).toBe('string')
	})

	test('build 2 column table', async() => {
		const table = utility.buildTable(goodData)
		// compare text using regex to remove whitespace
		expect(table.replace(/\s/g, '')).toBe(goodHTML.replace(/\s/g, ''))
	})

})
