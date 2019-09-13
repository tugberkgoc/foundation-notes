
'use strict'
/*
const sqlite = require('sqlite-async')
const db = await sqlite.open('./website.db')
await db.run('xxx')
const records = await db.get('xxx')
await db.close()
*/

module.exports.open = async name => {
	// opens a connection
	console.log(name)
	return new DB()
}

class DB {
	async run(query) {
		// runs a query
		console.log('run')
		console.log(query)
	}
	async get(query) {
		// runs a query and returns data
		console.log('get')
		console.log(query)
		return ['bread', 'butter', 'cheese']
	}
	async close() {
		// closes the connection
		console.log('close')
	}
}
