#!/usr/bin/env node
/* eslint-disable no-var */

'use strict'

const fs = require('fs')
const readline = require('readline-sync')

const dataDir = 'data'

var items = []

if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir)
}

const filename = process.argv[2] || 'data'

if(fs.existsSync(`${dataDir}/${filename}.json`)) { // next line returns a Buffer
    const data = fs.readFileSync(`${dataDir}/${filename}.json`).toString('utf8')
    //console.log(data)
    items = JSON.parse(data)
}

do {
	var input = String(readline.question('enter command: ')).trim()
	if (input.indexOf('add ') === 0) {
		const space = input.indexOf(' ')
		const item = input.substring(space).trim()
		console.log(`adding "${item}"`)
        items.push(item)
        const json = JSON.stringify(items, null, 2)
        fs.writeFileSync(`${dataDir}/${filename}.json`, json)
	}
	if (input.indexOf('list') === 0) {
		for (let i=0; i< items.length; i++) {
			console.log(`${i}. ${items[i]}`)
		}
	}
} while (input !== 'exit')
