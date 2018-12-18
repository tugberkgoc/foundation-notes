
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

describe('POST /form', () => {
	test('adding a valid user', async done => {
		expect.assertions(2)
		const response  = await request(server).post('/form').send('firstname=John&lastname=Doe')
		expect(response.text).toEqual('your name is John Doe')
		expect(response.status).toEqual(201)
		done()
	})
	test('trying adding a user with short name', async done => {
		expect.assertions(1)
		const response  = await request(server).post('/form').send('firstname=Jo&lastname=Do')
		expect(response.status).toEqual(422)
		done()
	})
})

describe('GET /names', () => {
	beforeAll( async() => {
		await request(server).post('/form').send('firstname=John&lastname=Doe')
		await request(server).post('/form').send('firstname=Jane&lastname=Doe')
		await request(server).post('/form').send('firstname=Mickey&lastname=Mouse')
		await request(server).post('/form').send('firstname=Fred&lastname=Flintstone')
	})
	xit('get all names', async done => {
		done()
	})
	xit('get all names with filter', async done => {
		done()
	})
	xit('ignore filter if querystring less than 3 chars', async done => {
		done()
	})
	xit('get all names in CSV format', async done => {
		done()
	})
	xit('get all names in XML format', async done => {
		done()
	})
	xit('get all names in JSON format', async done => {
		done()
	})
	xit('get all names in HTML format', async done => {
		done()
	})
	xit('get all names in invalid format', async done => {
		done()
	})
})

describe('DELETE /names', () => {
	test('delete names from server', async done => {
		expect.assertions(2)
		await request(server).post('/form').send('firstname=John&lastname=Doe')
		await request(server).post('/form').send('firstname=Jane&lastname=Doe')
		const response = await request(server).get('/names').set('Accept', 'application/json')
		expect(response.status).toBe(200)
		const data = JSON.parse(response.text)
		expect(data.names.length).toBeTruthy
		await request(server).del('/names')
		const response2 = await request(server).get('/names').set('Accept', 'application/json')
		expect(response2.status).toBe(404)
		done()
	})
})
