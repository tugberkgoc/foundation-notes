#!/usr/bin/env node

'use strict'

const list = process.argv[2] || 'data'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./todo.db')

const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)

rl.setPrompt('')
rl.prompt()

rl.on('line', input => {
    console.log(input)
    if (input == 'exit') return rl.close()
    if (input.indexOf('add ') === 0) {
        const item = input.substring(input.indexOf(' ')).trim()
        console.log(`adding "${item}"`)
        const sql = `INSERT INTO items(list, item) VALUES("${list}", "${item}")`
        console.log(sql)
        db.run(sql, err => {
            if(!err) console.log(`added ${item}`)
            rl.prompt()
        })
    }
    if (input.indexOf('list') === 0) {
        const sql = `SELECT item FROM items WHERE list = "${list}"`
        console.log(sql)
		db.each(sql, (err, row) => {
            console.log(row.item)
            rl.prompt()
        })
	}
})

rl.on('close', () => {
    db.close()
    process.exit(0)
})
