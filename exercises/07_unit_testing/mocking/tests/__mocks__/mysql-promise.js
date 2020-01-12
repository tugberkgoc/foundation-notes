
const sqlite = require('sqlite-async')

class DB {
	constructor() {
		return ( async() => {
			console.log('MOCK')
			this.db = await sqlite.open(':memory:')
			return this
		})()
	}
	configure() { return true }
	async isConfigured() { return true }
	async getConnection() { return true }
	async query(sql) {
		sql = sql.replace('AUTO_INCREMENT', 'AUTOINCREMENT') //mysql uses an underscore!
		const data = await this.db.all(sql)
		return [ data, [ { db: 'test', table: 'mock'} ] ]
		return data
	}
	async end() {
		await this.db.close()
		return true
	}
}

module.exports = DB
