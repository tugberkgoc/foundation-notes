
'use strict'

const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}

const {firstName: first, 'last name': last, department: dept} = employee
console.log(first) // prints 'Colin'
console.log(last) // prints 'Stephen'
console.log(dept) // prints 'Computing'
