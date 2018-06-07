
'use strict'

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({port: 40510})
//const interval = 1000

wss.on('connection', ws => {
	ws.on('message', message => {
		console.log(`received: ${message}`)
		ws.send(message)
	})
	//setInterval( () => ws.send(`${new Date()}`), interval)
})
