#!/usr/bin/env node
/* eslint no-magic-numbers: 0 */

'use strict'

const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	startYear: 2010,
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
	}
}

const jsonString = JSON.stringify(employee, null, 2)
console.log(jsonString)

employee.setName('Micky Mouse')
console.log(JSON.stringify(employee, null, 2))

// TypeError:
// const postCode = employee.address.postCode
// console.log(postCode)