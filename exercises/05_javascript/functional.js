
function addOld(...values) {
	let total = 0
	console.log(values)
	console.log(values[1])
	for (let i=0; i<values.length; i++) {
	  total += values[i]
	}
	return total
}

function add2(...values) {
	return values.reduce((acc, val) => acc + val)
}

const add = (...values) => values.reduce((acc, val) => acc + val)

console.log(add(1, 2, 3, 4))

function f5() {
	let sum = 0
	for (let i = 0, j = arguments.length; i < j; i++) {
		sum += arguments[i]
	}
	return sum / arguments.length
}

console.log(f5(1, 2, 3))
