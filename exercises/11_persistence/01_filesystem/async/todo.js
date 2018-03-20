#!/usr/bin/env node

'use strict'

const rl = require('readline').createInterface(process.stdin, process.stdout)
const fs = require('fs')

const dataDir = 'data'
const items = []
const indent = 2
const paramPos = 2
const filename = process.argv[paramPos] || 'data'

async function loop() {
	let input
	do {
		input = await question('enter command')
		console.log(input)
		if (input.indexOf('add ') === 0) {
			console.log('add')
			await createDir(dataDir)
			await add(input)
		}
		if (input.indexOf('list') === 0) {
			await list(items)
		}
		console.log(input)
	} while(input !== 'exit')
}

const question = text => new Promise( resolve => {
	rl.question(`${text}: `, answer => {
		rl.close()
		resolve(answer)
	})
})

const createDir = name => new Promise( (resolve, reject) => {
	if (!fs.existsSync(name)){
		fs.mkdir(name, err => {
			if(err) return reject(err)
			resolve()
		})
	}
})

const add = text => new Promise( (resolve, reject) => {
	const space = text.indexOf(' ')
	const item = text.substring(space).trim()
	console.log(`adding "${item}"`)
	items.push(item)
	const json = JSON.stringify(items, null, indent)
	fs.writeFile(`${dataDir}/${filename}.json`, json, err => {
		if(err) return reject(err)
		return resolve()
	})
})

const list = data => new Promise( resolve => {
	data.forEach( (element, index) => {
		console.log(`${index}: ${element}`)
	})
	resolve()
})

loop()
