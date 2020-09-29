#!/usr/bin/env node
/* eslint no-magic-numbers: 0 */

'use strict'

const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	startYear: 2010,
	gender: 'male',
	'date of birth': '1980-01-01',
	getName: function() {
		return `${this.firstName} ${this["last name"]}`
	},
	setName: function(fullname) {
		console.log(fullname)
		const words = fullname.toString().split(' ')
		console.log(words)
		console.log(this)
		this.firstName = words[0] || ''
		this['last name'] = words[1] || ''
	},
	get details() {
		return `firstName: ${this.firstName}, lastName: ${this["last name"]}, startYear: ${this.startYear}, gender: ${this.gender}, DoB: ${this["date of birth"]}`
	},
	get yearsWorked() {
		return (new Date().getFullYear() - this.startYear)
	},
	set name(fullname) {
		const names = fullname.toString().split(' ')
		this.firstName = names[0]
		this["last name"] = names[1]
	}
}

const jsonString = JSON.stringify(employee, null, 2)
console.log(jsonString)

employee.setName('Micky Mouse')
console.log(JSON.stringify(employee, null, 2))

// TypeError:
// const postCode = employee.address.postCode
// console.log(postCode)

const university = {
	year1: {
		a101: 'something11',
		b104: 'something12',
		c134: 'something13'
	},
	year2: {
		d201: 'something21',
		e204: 'something22',
		f234: 'something23'
	},
	year3: {
		g301: 'something31',
		h304: 'something32',
		i334: 'something33'
	}
}

const study01 = university.year1
for(const code in study01) console.log(`${code} ${study01[code]}`)

const {year1: year1, year2: year2, year3: year3} = university

delete employee.startYear
employee.startYear = '2010'

String.prototype.toArray = function() {
	return this.split('')
}
Array.prototype.toStr = function() {
	return this.join('')
}
console.log('foobar'.toArray().toStr())