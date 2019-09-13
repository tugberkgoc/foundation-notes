
'use strict'

let data = []

module.exports.clear = () => {
	data = []
}

module.exports.add = (item, qty) => {
	data.push({item: item, qty: qty})
}

module.exports.getAll = () => {
	if(data.length === 0) throw new Error('empty list')
	for(const key in data) data[key].key = key
	return data
}

module.exports.delete = key => {
	console.log(`delete key ${key}`)
	return
}
