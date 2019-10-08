
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
		return this.items
	}

	delete(name) {
		const index = this.items.indexOf(name)
		if(index !== -1) this.items.splice(index, 1)
	}

	count() {
		return this.items.count
	}

}
