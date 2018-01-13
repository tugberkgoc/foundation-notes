
'use strict'

/* eslint no-magic-numbers: 0 */

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

const divide = function(x, y) {
	if (y === 0) throw Error
	return x / y
}

const test3 = myfuncSync2(4, 5, plus)
const test4 = myfuncSync2(4, 5, multiply)
const test5 = myfuncSync2(4, 5, divide)

console.log(test3, test4, test5)
