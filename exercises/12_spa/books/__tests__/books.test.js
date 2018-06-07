
'use strict'

/* eslint-disable no-magic-numbers */

const books = require('../modules/books')

jest.mock('../modules/google')

console.log(__dirname)

describe('searchGoogle', () => {

	test('make a simple API call', async() => {
		const search = 'java'
		const data = await books.searchGoogle(search)
		console.log(data)
	})
})
