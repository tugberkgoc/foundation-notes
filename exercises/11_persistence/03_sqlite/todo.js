#!/usr/bin/env node
/* eslint-disable no-var */

'use strict'

const readline = require('readline-sync')
const sqlite3 = require('sqlite3').verbose()

const dbName = 'todo'

var items = []

const list = process.argv[2] || 'data'

const db = new sqlite3.Database('./todo.db')
db.run('CREATE TABLE IF NOT EXISTS items(list text, item text)')

// const db = new sqlite3.Database('./todo.db', (err) => {
// 	if (err) return console.error(err.message)
// 	console.log('Connected to the SQlite database.')
//     db.run('CREATE TABLE IF NOT EXISTS items(list text, name text)')
//     db.close((err) => {
//         if (err) return console.error(err.message)
//         console.log('Close the database connection.')
//     })
// })


do {
	var input = String(readline.question('enter command: ')).trim()
	if (input.indexOf('add ') === 0) {
		const space = input.indexOf(' ')
		const item = input.substring(space).trim()
        console.log(`adding "${item}"`)
        const sql = `INSERT INTO items(list, item) VALUES("${list}", "${item}")`
        console.log(sql)
        db.run(sql, err => {
            console.error('ERROR')
        })
	}
	if (input.indexOf('list') === 0) {
		for (let i=0; i< items.length; i++) {
			console.log(`${i}. ${items[i]}`)
		}
	}
} while (input !== 'exit')

db.close()
