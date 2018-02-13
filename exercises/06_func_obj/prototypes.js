#!/usr/bin/env node
/* eslint no-magic-numbers: 0 */

'use strict'

String.prototype.toArray = function() {
	const strArr = this.split('')
	return strArr
}

const nameArray = 'John Doe'.toArray()
console.log(nameArray)
