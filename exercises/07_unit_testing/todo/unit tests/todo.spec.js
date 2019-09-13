
'use strict'

const todo = require('../modules/todo.js')

beforeAll( async() => {
	// stuff to do before any of the tests run
})

afterAll( async() => {
	// runs after all the tests have completed
})

describe('add()', () => {
	// block of tests
	beforeEach( async() => {
		todo.clear()
	})
	afterEach( async() => {
		// runs after each test completes
	})
	test('add a single item', async done => {
		expect.assertions(1)
		try {
			todo.add('bread', 3)
			expect(todo.countItems()).toBe(1)
		} catch(err) {
			done.fail(err)
		} finally {
			done()
		}
	})
	test('qty must be a number', async done => {
		expect.assertions(1)
		try {
			todo.add('bread', 'three')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe('qty must be a number')
		} finally {
			done()
		}
	})

	test('duplicates should increase qty', async done => {
		expect.assertions(2)
		try {
			// ACT
			todo.add('bread', 4)
			todo.add('bread', 2)
			// ASSERT
			expect(todo.countItems()).toBe(1)
			expect(todo.getAll()[0].qty).toEqual(6)
		} catch(err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	// New test goes HERE!

})
