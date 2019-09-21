#!/usr/bin/env node
/* eslint no-magic-numbers: 0, arrow-body-style: 0 */

'use strict'

// the examples uses these two arrays
const names = ['Mark', 'John', 'Stephen', 'James', 'William', 'John', 'Peter', 'Mark']
const data = ['Coventry', 3.14159, 'Computer', 42, true, 365.25, 101]

function makeUpperCase(name) {
	return name.toUpperCase()
}

const upper1 = names.map(makeUpperCase)

console.log('upper1')
console.log(upper1)

const upper2 = names.map( value => {
	return value.toUpperCase()
})

console.log(upper2)

const upper3 = names.map( value => value.toUpperCase() )

console.log(upper3)

const integers = data.filter( val => Number.isInteger(val) )

console.log(integers)

const strings = data.filter( val => typeof val === 'string')

console.log(strings)

const floats = data.filter( val => typeof val === 'number' && val % 1 !== 0)

console.log(floats)

const long2 = names.reduce( (acc, val) => {
	if (val.length > acc.length) {
		return val
	} else {
		return acc
	}
})

console.log(long2)

const long3 = names.reduce( (acc, val) => val.length > acc.length ? val : acc)

console.log(long3)

/* challenge: return the largest integer by chaining filter and reduce */

/* The Array.reduce() function takes an optional second parameter which allows you to
define a default value for the accumulator. In this example we wrap use the Array.map()
function to loop through the names. We then use the Array.reduce() function with the
accumulator defaulting to an empty array. */

const rev1 = names.map( value => {
	const rev = value.split('').reduce( (acc, val) => {
		acc.unshift(val)
		return acc
	}, [])
	return rev.join('')
})

console.log(rev1)

// rewritten using a different approach.

function reverse(acc, val) {
	return val + acc
}

const rev = 'william'.split('').reduce(reverse, '')

console.log(rev)

/* As with all functional programming, with a few tweaks we can turn this into a single
line. The example below uses a different approach to reversing the strings, can you
figure out how this is done? */

const reverse2 = names.map( value => value.split('').reduce( (acc, val) => val + acc, ''))

console.log(reverse2)

/* challenge: use the Array.reduce() function to remove duplicates in the names array */
