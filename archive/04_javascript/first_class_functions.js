#!/usr/bin/env node
/* eslint no-magic-numbers: 0 */

'use strict'

// use a function to modify functionality

const myfuncSync = function(x, y, operation) {
	let result
	switch (operation) {
		case 'plus':
			result = x + y
			break
		case 'multiply':
			result = x * y
			break
	}
	return result
}

const test1 = myfuncSync(3, 2, 'plus')
const test2 = myfuncSync(3, 2, 'multiply')

console.log(test1, test2)

const myfuncSync2 = function(x, y, operation) {
	return operation(x, y)
}

const plus = function(x, y) {
	return x + y
}

const multiply = function(x, y) {
	return x * y
}

var divide = function(x, y) {
	if (y === 0) throw Error
	return x / y
}

var test3 = myfunc_async(4,5,plus)
var test4 = myfunc_async(4,5,multiply)

console.log(test3, test4)
