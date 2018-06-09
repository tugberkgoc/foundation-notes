
'use strict'

/* eslint-disable no-magic-numbers */

const fs = require('fs')
const books = require('../modules/books')

jest.mock('../modules/google')

const path = './modules/__mocks__/__mockData__/'

describe('searchGoogle', () => {

	test('make a simple API call', async() => {
		const search = 'java'
		const data = await books.searchGoogle(search)
		//console.log(data)
		return data
	})

})

describe('extractFields', () => {

	let goodData

	beforeAll( () => {
		goodData = fs.readFileSync(`${path}java.json`, 'utf8')
		expect(typeof goodData).toBe('string')
	})

	test('extracted data is in an array', () => {
		const bookData = books.extractFields(goodData)
		expect(Array.isArray(bookData)).toBeTruthy()
		expect(bookData.length).toBe(20)
	})

	test('passing string without books array', () => {
		expect(() => books.extractFields('{"name": "Mark"}'))
			.toThrowError('no book data found')
	})

	test('passing object instead of string', () => {
		expect(() => books.extractFields({name: 'Mark'}))
			.toThrowError('parameter has invalid data type')
	})

	test('extract title fields', () => {
		const bookData = books.extractFields(goodData)
		expect(bookData[0].title).toBe('Thinking in Java')
		expect(bookData[1].title).toBe('Practical Java')
	})

	test('extract ISBN13 data', () => {
		const bookData = books.extractFields(goodData)
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
		expect(() => books.buildTable('bad parameter'))
			.toThrowError('invalid parameter data type')
	})

	test('check that parameter is an array (not object)', () => {
		expect(() => books.buildTable({name: 'Mark'}))
			.toThrowError('invalid parameter data type')
	})

	test('check the function returns a string', () => {
		const table = books.buildTable(goodData)
		expect(typeof table).toBe('string')
	})

	test('build 2 column table', async() => {
		const table = books.buildTable(goodData)
		// compare text using regex to remove whitespace
		expect(table.replace(/\s/g, '')).toBe(goodHTML.replace(/\s/g, ''))
	})

})

describe('search', () => {

	let req

	beforeEach( () => {
		req = JSON.parse(fs.readFileSync(`${path}req.json`, 'utf8'))
	})

	test('make a search with valid request', async() => {
		const result = await books.search(req)
		const expected = fs.readFileSync(`${path}validTable.txt`, 'utf8')
		// compare text using regex to remove whitespace
		expect(result.replace(/\s/g, '')).toBe(expected.replace(/\s/g, ''))
	})

	test('make a search with no query parameters', async() => {
		delete req.query
		const result = await books.search(req)
		expect(result.replace(/\s/g, '')).toBe('')
	})

	test('make a search with missing q query parameter', async() => {
		req.query.r = 'something'
		delete req.query.q
		const result = await books.search(req)
		expect(result.replace(/\s/g, '')).toBe('')
	})

})
