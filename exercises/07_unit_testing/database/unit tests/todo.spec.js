
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
			// ARRANGE
			const todo = await new ToDo() // DB runs in-memory if no name supplied
			// ACT
			await todo.add('bread', 3)
			const count = await todo.countItems()
			// ASSERT
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
			// ARRANGE
			const todo = await new ToDo()
			// ACT
			await todo.add('bread', 'three')
			done.fail('test failed')
		} catch(err) {
			// ASSERT
			expect(err.message).toBe('the quantity must be a number')
		} finally {
			done()
		}
	})

	test('duplicates should increase qty', async done => {
		expect.assertions(2)
		try {
			// ARRANGE
			const todo = await new ToDo()
			// ACT
			await todo.add('bread', 4)
			await todo.add('bread', 2)
			const count = await todo.countItems()
			const data = await todo.getAll()
			const qty = data[0].qty
			// ASSERT (note there are two assertions as stated on line 50)
			expect(count).toBe(1)
			expect(qty).toEqual(6)
		} catch(err) {
			done.fail(err.message)
		} finally {
			done()
		}
	})

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
