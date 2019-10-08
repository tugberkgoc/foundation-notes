
'use strict'

const fs = require('fs')

async function main() {
	try {
		await saveData1('hello world 1\n')
		await saveData2('hello world 2\n')
		await saveData3('hello world 3\n')
		await saveData4('hello world 4\n')
	} catch (err) {
		console.log(err.message)
	}
}

const saveData1 = function(data) {
	return new Promise(function(resolve, reject) {
		try {
			fs.appendFileSync('data.txt', data)
			resolve()
		} catch(err) {
			reject(err.message)
		}
	})
}

const saveData2 = data => new Promise( (resolve, reject) => {
	try {
		resolve(fs.appendFileSync('data.txt', data))
	} catch(err) {
		reject(err.message)
	}
})

const saveData3 = async function(data) {
	return fs.appendFileSync('data.txt', data)
}

const saveData4 = async data => fs.appendFileSync('data.txt', data)

main()
