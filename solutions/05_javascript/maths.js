#!/usr/bin/env node
/* eslint no-magic-numbers: 0 */

'use strict'

function largestNumber(a, b) {
	if (a > b) return a
	if (b > a) return b
	return null
}

const biggest = largestNumber(5, 8)
console.log(biggest)
// the code below achieves the same using the 'spread operator'
const nums = [5, 8]
const biggest2 = largestNumber(...nums)
console.log(biggest2)

// example using the arguments object
function add() {
	let total = 0
	console.log(arguments)
	console.log(arguments['1'])
	for(const arg of arguments) {
		total += arg
	}
	return total
}

const addNums = add(1, 2, 3, 4)
console.log(addNums)


// example using a rest parameter
function add2(...values) {
	let total = 0
	console.log(values)
	for (let i=0; i<values.length; i++) {
		total += values[i]
	}
	return total
}

const addNums2 = add2(1, 2, 3, 4)
console.log(addNums2)


// example with default parameter
function divide(dividend, divisor=1) {
	const quotient = dividend / divisor
	return quotient
}

const quotient = divide(42, 2)
console.log(`calling the divide function with '2' paramters: ${quotient}`)

const quotient2 = divide(42)
console.log(`calling divide function with '1' parameter: ${quotient2}`)

// function expression using the `function` keyword
const remainder = function(dividend, divisor) {
	const quotient = Math.floor(dividend / divisor)
	return dividend - quotient * divisor
}

const rem = remainder(8, 5)
console.log(`remainder: ${rem}`)

// function expression using arrow syntax (preferred)
const remainder2 = (dividend, divisor) => dividend - Math.floor(dividend / divisor) * divisor
console.log('remainder2: ' + remainder2(13, 4))

// function expression using arrow syntax and one parameter
const sqr = num => num * num
console.log(sqr(4))

function multiply(a = 1, b = 1) {
	return a * b
}
console.log(multiply(3, 5))

function divideThis(dividend, divisor = 1) {
	return dividend / divisor
}
console.log(divideThis(5, 2))

function average(...numbers) {
	if (numbers.length === 0) return 0
	let sum = 0
	for (const number of numbers) sum += number
	return sum / numbers.length
}
console.log(`average of [2, 4, 6]: ${average(2, 4, 6)}`)

const squareRoot = a => Math.sqrt(a)
console.log(`squareRoot of 4096: ${squareRoot(4096)}`)

const longest = (...strings) => strings.length === 0 ? null : strings.reduce((longestString, currentString) => currentString.length > longestString.length ? currentString : longestString)
// simple version without using reduce:
// const longest = (...strings) => {
// 	if (strings.length === 0) return null
// 	let longest = strings[0]
// 	for (const string of strings) if (string > longest) longest = string
// 	return longest
// }
console.log(`longest of ['a', 'aaa', 'aa']: ${longest('a', 'aaa', 'aa')}`)