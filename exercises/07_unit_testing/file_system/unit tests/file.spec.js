'use strict'

const mock = require('mock-fs')
const File = require('../modules/file')

const fs = require('fs')
const file = new File()


beforeAll( async() => {
	mock({
		'test': {
			'foobar': 'foobar2\n'
		}
	})
})

afterAll( async() => {
	mock.restore()
})

describe('savePicture()', () => {
	beforeEach( async() => {})
	afterEach( async() => {})

	test(`filename can't be empty string`, async done => {
		expect.assertions(1)
		try {
			await file.savePicture('', 'asd')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe(`filename can't be empty`)
		} finally {
			done()
		}
	})
	test(`filename can't be undefined`, async done => {
		expect.assertions(1)
		try {
			await file.savePicture()
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe(`filename can't be empty`)
		} finally {
			done()
		}
	})
	test(`imageData can't be empty`, async done => {
		expect.assertions(1)
		try {
			await file.savePicture('foo.jpg')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe(`imageData can't be empty`)
		} finally {
			done()
		}
	})
	test(`binary information has to be correctly saved`, async done => {
		expect.assertions(1)
		try {
			await file.savePicture('image', 'raboof')
			let output = await file.readPicture('image')
			expect(output).toBe('raboof')
		} catch(err) {
			expect(err.message).toBe("issue with writing")
		} finally {
			done()
		}
	})
})

describe('readPicture()', () => {
	beforeEach( async() => { })
	afterEach( async() => { })
	test(`filename can't be empty`, async done => {
		expect.assertions(1)
		try {
			await file.readPicture('')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe(`filename can't be empty`)
		} finally {
			done()
		}
	})
	test(`filename can't be undefined`, async done => {
		expect.assertions(1)
		try {
			await file.readPicture()
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe(`filename can't be empty`)
		} finally {
			done()
		}
	})
	test('file has to exist', async done => {
		expect.assertions(1)
		try {
			await file.readPicture('nonExistent.txt')
			done.fail('test failed')
		} catch(err) {
			expect(err.message).toBe("file doesn't exist")
		} finally {
			done()
		}
	})
	test(`binary information has to be correctly read`, async done => {
		expect.assertions(1)
		try {
			let output = await file.readPicture('test/foobar')
			//console.log("Output: ", output)
			expect(output).toBe("foobar2\n")
		} catch(err) {
			console.log(err)
			expect(err.message).toBe("issue with reading")
		} finally {
			done()
		}
	})
})
