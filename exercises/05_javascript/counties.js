#!/usr/bin/env node

'use strict'

function print() {
	console.log(this)
}

const obj1 = { name: 'Kent', print: print }
// this example uses the ES6 Object Shorthand syntax
const obj2 = { name: 'Cornwall', print }

print()

obj1.print()
obj2.print()
