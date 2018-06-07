
'use strict'

/* eslint-disable no-magic-numbers */

const fs = require('fs')
const books = require('../modules/books')

jest.mock('../modules/google')

//console.log(__dirname)

let goodData

describe('searchGoogle', () => {

	beforeAll( () => {
		const path = './modules/__mocks__/__mockData__/'
		goodData = fs.readFileSync(`${path}java.json`, 'utf8')
		expect(typeof goodData).toBe('string')
	})

	test('make a simple API call', async() => {
		const search = 'java'
		const data = await books.searchGoogle(search)
		//console.log(data)
		return data
	})
})

describe('extractFields', () => {

	test('extract title fields', () => {
		const bookData = books.extractFields(goodData)
		//console.log(bookData)
		expect(Array.isArray(bookData)).toBeTruthy()
		expect(bookData.length).toBe(2)
		console.log(bookData)
		expect(bookData[0].title).toBe('Java Book One')
		expect(bookData[1].title).toBe('Java Book Two')
	})

	test('extract ISBN13 data', () => {

	})

})
