
'use strict'

const fs = require('fs')

module.exports = class File {

	constructor(name) {
		return async() => {
			this.filename = name
		}
	}

	async add(item, qty) {
		fs.readFile(this.filename, 'utf8', (err, data) => {
			if (err) throw new Error('file not found')
			data = JSON.parse(data)
			data.append({ item, qty })
			data = JSON.stringify(data)
			fs.writeFile(this.filename, data, 'utf8', (err) => {
				if(err) throw err
			} )
		})
	}

	get records() {
		return async() => {
			fs.readFile(this.filename, 'utf8', (err, data) => {
				if (err) throw new Error('file not found')
				return JSON.parse(data)
			})
		}
	}

}
