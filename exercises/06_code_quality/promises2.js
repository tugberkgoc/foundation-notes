
'use strict'

const request = require('request')
const readline = require('readline')
let userDetails

const getInput = prompt => new Promise( resolve => {
	const io = { input: process.stdin, output: process.stdout }
	const read = readline.createInterface(io)
	read.question(`${prompt}: `, data => {
		// console.log(data)
		read.close()
		return resolve(data)
	})
})

const getData = () => new Promise( (resolve, reject) => {
	const options = {
		url: 'https://api.github.com/users/marktyers',
		headers: {
			'User-Agent': 'request'
		}
	}
	// Do async job
	request.get(options, (err, resp, body) => {
		if (err) reject(err)
		else return resolve(JSON.parse(body))
	})
})

function main() {
	getData()
		.then(result => {
			userDetails = result
			console.log('Initialized user details')
			console.log(userDetails)
		})
		.then(() => getInput('enter base currency'))
		.then(data => console.log(data))
		.then(() => getInput('convert to'))
		.then(data => console.log(data))
		.catch(err => console.log(err))
}

main()
