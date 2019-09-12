#!/usr/bin/env node

'use strict'

const fs = require('fs')

function saveText(text, callback) {
	try {
		fs.appendFileSync('messages.txt', `${text}\n`, 'ascii')
		const contents = fs.readFileSync('messages.txt', 'utf8')
		callback(null, contents)
	} catch(err) {
		callback(err)
	}
}

saveText('Hello world!', (err, data) => {
	if(err) console.log(err)
	console.log(data)
})
