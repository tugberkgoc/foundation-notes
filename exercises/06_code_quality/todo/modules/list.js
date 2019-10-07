
'use strict'

module.exports = class List {

	constructor() {
		this.items = []
	}

	add(item, qty) {
		const data = {item: item, qty: qty}
		this.items.push(data)
	}

	getAll() {
		return this.items.map( (element, index) => ({key: index, item: element.item, qty: element.qty}))
	}

	delete(id) {
		this.items.splice(id, 1)
	}

	count() {
		return this.items.count
	}

}
