
'use strict'

let data = []

module.exports.clear = () => {
	data = []
}

module.exports.add = (item, qty) => {
	qty = Number(qty)
	if(isNaN(qty)) throw new Error('the quantity must be a number')
	data.push({item: item, qty: qty})
}

module.exports.getAll = () => {
	//if(data.length === 0) throw new Error('empty list')
	for(const key in data) data[key].key = key
	return data
}

module.exports.delete = key => {
	console.log(`delete key ${key}`)
	return
}

module.exports.countItems = () => data.length
