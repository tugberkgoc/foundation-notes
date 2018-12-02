
'use strict'

const request = require('supertest')
const server = require('../index.js')

afterAll( () => server.close())

describe('GET /', () => {
	test('we should see the text "Hello World" displayed', async done => {
		expect.assertions(1)
		const response = await request(server).get('/')
        expect(response.text).toEqual('Hello World')
		done()
	})
})

describe('GET /anon', () => {
    test('we should see the text "Hello World" displayed', async done => {
		expect.assertions(1)
		const response = await request(server).get('/anon')
        expect(response.text).toEqual('Hello World')
		done()
	})
})

describe('GET /books/:index', () => {
    test('passing index 0 returns "The Hobbit"', async done => {
		expect.assertions(1)
		const response = await request(server).get('/books/0')
        expect(response.text).toEqual('The Hobbit')
		done()
    })
    test('passing index 2 returns "The Secret Garden"', async done => {
		expect.assertions(1)
		const response = await request(server).get('/books/2')
        expect(response.text).toEqual('The Secret Garden')
		done()
	})
})

describe('GET /name', () => {
    test('browser should display all querystrings as a JSON string', async done => {
		expect.assertions(1)
	    const response = await request(server).get('/name?firstname=Mark')
        expect(response.text).toEqual('{"firstname":"Mark"}')
	    done()
	})
})

describe('GET /hello/:name', () => {
    test('browser should display the name in the URL', async done => {
		expect.assertions(1)
	    const response = await request(server).get('/hello/Mark')
        expect(response.text).toEqual('hello Mark')
	    done()
    })
    test('the "format" querystring should make name uppercase', async done => {
		expect.assertions(1)
	    const response = await request(server).get('/hello/Mark?format=upper')
        expect(response.text).toEqual('hello MARK')
	    done()
	})
})
