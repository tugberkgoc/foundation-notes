
'use strict'

let data = []

module.exports.clear = () => {
	data = []
}

module.exports.add = (item, qty) => {
	qty = Number(qty)
<<<<<<< HEAD
	if(isNaN(qty)) throw new Error('the quantity must be a number')
	let flag = false
	for(let index in data) {
		if (data[index].item === item) {
			data[index].qty+= qty
			flag = true
		}
	}
	if(flag === false) {
		data.push({item: item, qty: qty})
	}
=======
	if(isNaN(qty)) throw new Error('qty must be a number')
	data.push({item: item, qty: qty})
>>>>>>> upstream/master
}

module.exports.getAll = () => {
	for(const key in data) data[key].key = key
	return data
}

module.exports.delete = key => {
	console.log(`delete key ${key}`)
	return
}

module.exports.countItems = () => data.length
