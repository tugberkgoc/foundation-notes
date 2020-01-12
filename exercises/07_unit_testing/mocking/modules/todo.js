
const MySQL = require('mysql-promise')

module.exports = class User {
	constructor() {
		return( async() => {
			this.db = await new MySQL()
			this.db.configure({ "host": "localhost", "user": "root", "password": "p455w0rd", "database": "test"})
			await this.db.query('CREATE TABLE IF NOT EXISTS list(id INTEGER PRIMARY KEY AUTO_INCREMENT, item TEXT, qty INTEGER)')
			return this
		})()
	}
	async addRecord(item, qty) {
		const sql = `INSERT INTO list(item, qty) VALUES("${item}", ${qty})`
		await this.db.query(sql)
		return true
	}
	async getAll() {
		const sql = 'SELECT item, qty FROM list'
		const data = await this.db.query(sql)
		return data
	}
	async close() {
		await this.db.end()
	}
}
