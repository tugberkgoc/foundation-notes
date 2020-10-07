
/**
 * Class representing a list of items.
 * */
class List {

	/**
	 * Create a list.
	 */
	constructor() {
		this.items = []
	}

	/**
	 * Add an item to the list.
	 * @param {String} item - The name of the eitem.
	 * @param {Number} qty - The number of items to add.
	 */
	add(item, qty) {
		const data = {item: item, qty: qty}
		this.items.push(data)
	}

	/**
	 * Return the list of items.
	 * @return {Array.<{item: String, qty: Number}>} An array containing the items.
	 */
	getAll() {
		return this.items.map( (element, index) => ({key: index, item: element.item, qty: element.qty}))
	}

	/**
	 * Delete an item from the list.
	 * @param {Number} id - The index of the deletable item
	 */
	delete(id) {
		this.items.splice(id, 1)
	}

	/**
	 * Return the number of items in the list
	 * @return {Number} The number of items in the list
	 */
	count() {
		return this.items.count
	}

}

// exporting the class by name adds the name to the documentation
module.exports = {
	List
}
