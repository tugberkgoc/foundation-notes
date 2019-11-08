'use strict'

const fs = require('fs')

module.exports = class File {
	constructor() {}

	async savePicture(filename, imageData) {
		if (filename === undefined || filename === '') throw new Error(`filename can't be empty`)
		if (imageData === undefined || imageData === '') throw new Error(`imageData can't be empty`)
		try {
			fs.writeFile(filename, imageData, 'binary')
		} catch(err) {
			throw err
		}
	}

	async readPicture(filename) {
		if (filename === undefined || filename === '') throw new Error(`filename can't be empty`)
		try {
			return fs.readFileSync(filename, 'binary')
		} catch(err) {
			if (err.message == `ENOENT: no such file or directory, open '${filename}'`)
				throw new Error("file doesn't exist")
			else
				throw err
		}
	}
}
