
'use strict'

const sqlite = require('sqlite-async')

module.exports = class ToDo {

	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT, qty NUMERIC)'
			await this.db.run(sql)
			return this
		})()
	}

	async add(item, qty) {
		qty = Number(qty)
		if(isNaN(qty)) throw new Error('the quantity must be a number')
		const sql = `INSERT INTO items(item, qty) VALUES("${item}", ${qty})`
		await this.db.run(sql)
	}

	async getAll() {
		const sql = 'SELECT * FROM items'
		const data = await this.db.all(sql)
		console.log(data)
		return data
	}

	async delete(id) {
		const sql = `DELETE FROM items WHERE id=${id}`
		await this.db.run(sql)
	}

	async countItems() {
		const sql = 'SELECT COUNT(*) as items FROM items'
		const data = await this.db.get(sql)
		return data
	}

}

// https://stackoverflow.com/questions/43431550/async-await-class-constructor
// https://www.sqlite.org/inmemorydb.html
