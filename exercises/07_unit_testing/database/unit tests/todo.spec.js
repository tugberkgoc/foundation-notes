
'use strict'

const ToDo = require('../modules/todo.js')

beforeAll( async() => {
	// stuff to do before any of the tests run
})

afterAll( async() => {
	// runs after all the tests have completed
})

describe('add()', () => {
	// block of tests
	// beforeEach( async() => {
	// 	todo.clear()
	// })
	afterEach( async() => {
		// runs after each test completes
	})
	test('add a single item', async done => {
		expect.assertions(1)
		try {
			const todo = await new ToDo() // DB runs in-memory if no name supplied
			await todo.add('bread', 3)
			const count = await todo.countItems()
			expect(count).toBe(1)
		} catch(err) {
			done.fail(err)
		} finally {
			done()
		}
	})
	test('qty must be a number', async done => {
		expect.assertions(1)
		try {
			const todo = await new ToDo()
			await todo.add('bread', 'three')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('qty must be a number')
		} finally {
			done()
		}
	})

	// New test goes HERE!

})

describe('delete()', () => {
	// any tests for the delete() function should be written here
})

describe('getAll()', () => {
	// any tests for the getAll() function should be written here
})

describe('clear()', () => {
	// any tests for the clear() function should be written here
})
