
'use strict'

const ws = new WebSocket('ws://localhost:40510')

ws.onopen = () => {
	console.log('websocket is connected ...')
	ws.send('connected')
}

ws.onmessage = event => {
	console.log(event.data)
}

window.document.querySelector('[type=button]').addEventListener('click', () => {
	console.log('click!')
	ws.send(window.document.getElementById('message').value)
	window.document.getElementById('message').value = ''
})
