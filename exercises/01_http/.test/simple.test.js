
'use strict'

const request = require('supertest')
const server = require('../index.js')
const status = require('http-status-codes')

afterAll( () => server.close())

describe('GET /', () => {
    test('the page should return a status code of "200 OK"', async done => {
		expect.assertions(1)
		const response = await request(server).get('/')
        expect(response.status).toEqual(status.OK)
		done()
	})
	test('we should see the text "Hello World" displayed', async done => {
		expect.assertions(1)
		const response = await request(server).get('/')
        expect(response.text).toEqual('Hello World')
		done()
	})
})
