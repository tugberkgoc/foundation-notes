
'use strict'

const express = require('express')

const app = express()
app.use(express.static('public'))

const port = 8080

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/html/index.html')
})

app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})

const WebSocketServer = require('ws').Server
const wsServer = new WebSocketServer({port: 40510})
//const interval = 5000
const clients = []

wsServer.on('connection', ws => {
	ws.on('message', message => {
		console.log(`received: ${message}`)
		//ws.send(message)
		for (let i=0; i < clients.length; i++) {
			console.log(clients[i])
			clients[i].send(message)
		}
	})
	//setInterval( () => ws.send(`${new Date()}`), interval)
})

wsServer.on('request', request => { // called when someone connects
	console.log('new connection')
	const connection = request.accept(null, request.origin)
	console.log(connection)
	clients.push(connection)
})
