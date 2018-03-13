#!/usr/bin/env node

'use strict'

const readline = require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./todo.db')

const list = process.argv[2] || 'data'

const recursiveAsyncReadLine = () => {
	rl.question('Command: ', input => {
		if (input === 'exit') {
			db.close()
			return rl.close()
		}
		console.log(`You input: "${input}"`)
		//if(input === 'exit') process.exit(0)
		if (input.indexOf('add ') === 0) {
			const item = input.substring(input.indexOf(' ')).trim()
			console.log(`adding "${item}"`)
			const sql = `INSERT INTO items(list, item) VALUES("${list}", "${item}")`
			console.log(sql)
			db.run(sql, err => {
				if(!err) console.log(`added ${item}`)
				recursiveAsyncReadLine()
			})
		}
	  //recursiveAsyncReadLine()
	})
  }

recursiveAsyncReadLine()
