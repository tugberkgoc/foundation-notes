#!/usr/bin/env node
/* eslint no-magic-numbers: 0 */

'use strict'

const names = ['Mark', 'John', 'Stephen', 'James', 'William']

function uppercase(nameArray) {
	const result = []
	for (const name of nameArray) {
		result.push(name.toUpperCase())
	}
	return result
}

// create a function to reverse the order of the indexes (index 0 should be William)

console.log(uppercase(names))

// here is the same functionality written using the array's map() method.
const upper = names.map( value => value.toUpperCase() )

console.log(upper)

// rest operator, passing in unknown number of parameters.

function longest(...params) {
	let longest = ''
	for (const name of params) {
		if (name.length > longest.length) {
			longest = name
		}
	}
	return longest
}

const long = longest('John', 'William', 'Peter')
console.log(long)

// rewriting this using reduce.

const long2 = names.reduce( (acc, val) => {
	if (val.length > acc.length) {
		return val
	} else {
		return acc
	}
})

console.log(long2)

// rewritten using the Conditional Operator

const long3 = names.reduce( (acc, val) => val.length > acc.length ? val : acc)

console.log(long3)

const data = ['Coventry', 3.14159, 'Computer', 42, true, 365.25, 101]

const integers = data.filter( val => Number.isInteger(val) )

console.log(integers)

const floats = data.filter( val => typeof val === 'number' && val % 1 !== 0)

console.log(floats)

const strings = data.filter( val => typeof val === 'string')

console.log(strings)
