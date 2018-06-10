
'use strict'

/* eslint-disable no-magic-numbers */

const fs = require('fs')
const books = require('../modules/books')

jest.mock('../modules/google')

const path = './modules/__mocks__/__mockData__/'

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
		try {
			delete req.query.q
			await books.search(req)
		} catch(err) {
			expect(err.message).toMatch('invalid isbn')
		}
	})

})

describe('details', () => {

	let req

	beforeEach( () => {
		req = JSON.parse(fs.readFileSync(`${path}req.json`, 'utf8'))
	})

	test('return details of a book using a valid isbn number', async() => {
		console.log(req)
		const result = await books.details(req)
		const expected = fs.readFileSync(`${path}9781785885587.json`, 'utf8')
		expect(result.replace(/\s/g, '')).toBe(expected.replace(/\s/g, ''))
	})

	// test('request a book with no params', async() => {
	// 	delete req.params
	// 	await books.details(req).rejects.toEqual(Error('invalid isbn'))
	// })

})
