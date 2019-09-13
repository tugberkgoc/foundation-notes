
'use strict'

let data = []

module.exports.clear = () => {
	data = []
}

module.exports.add = (item, qty) => {
	qty = Number(qty)
	if(isNaN(qty)) throw new Error('the quantity must be a number')
	let flag = false
	for(const index in data) {
		if (data[index].item === item) {
			data[index].qty+= qty
			flag = true
		}
	}
	if(flag === false) data.push({item: item, qty: qty})
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

module.exports.count = data.length
