
'use strict'

/* eslint-disable no-magic-numbers */

const google = require('../modules/google')


describe('search', () => {

	test('check response is valid', async() => {
		const base = 'https://www.googleapis.com/books/v1/volumes'
		const fields = 'items(id,volumeInfo(title,industryIdentifiers))'
		const url = `${base}?maxResults=20&fields=${fields}&q=java`
		const data = await google.search(url)
		expect(typeof data).toBe('string')
		const json = JSON.parse(data)
		expect(Array.isArray(json.items)).toBeTruthy()
		expect(json.items.length).toBe(20)
	})

})

describe('getBook', async() => {

	test('get book with valid isbn', async() => {
		const fields = 'items(volumeInfo(title,authors,description,publisher))'
		const url = `https://www.googleapis.com/books/v1/volumes?fields=${fields}&q=isbn:9781785885587`
		const data = await google.getBook(url)
		expect(typeof data).toBe('string')
		const json = JSON.parse(data)
		expect(json.title).toBeTruthy()
		expect(json.authors).toBeTruthy()
		expect(Array.isArray(json.authors))
	})

	// toThrowError does not support promises!
	test('try to use invalid isbn number', async() => {
		try {
			const fields = 'items(volumeInfo(title,authors,description,publisher))'
			const url = `https://www.googleapis.com/books/v1/volumes?fields=${fields}&q=isbn:9781785885581`
			await google.getBook(url)
		} catch(err) {
			expect(err.message).toMatch('invalid isbn')
		}
	})

})
