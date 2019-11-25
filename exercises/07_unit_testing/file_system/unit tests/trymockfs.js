// Example file that demonstrates the use of mock-fs

'use strict'

const mock = require('mock-fs')
const fs = require('fs')

mock({
	'test': {
		'foo': 'bar'
	}
})
fs.readFile('test/foo', 'UTF-8', (err, data) => {
	if (err) throw new Error(err)
	console.log(data)
})
fs.writeFile('test/bar', 'foo', 'UTF-8', (err) => {
	if (err) throw new Error(err)
})
fs.readFile('test/bar', 'UTF-8', (err, data) => {
	if (err) throw new Error(err)
	console.log(data)
})
// shouldn't be restored prematurely when dealing with async code
// mock.restore()
