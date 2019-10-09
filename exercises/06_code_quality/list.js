#!/usr/bin/env node

'use strict'

const readline = require('readline-sync')
const items = []
let action

while(true) {
	action = String(readline.question('enter a command (add, list, quit): '))
	switch(action) {
		case 'add':
			const item = String(readline.question('item name: '))
			const qty = Number(readline.question(`now many items of type "${item}": `))
			items.push({item, qty})
		case 'list':
			items.forEach( item => console.log(`${item.item}: ${item.qty}`))
		case 'quit':
			process.exit()
		default:
			console.log('command not recognised')
	}
}
