
'use strict'

const READY = 4
const OK = 200

window.document.querySelector('button').addEventListener('click', () => {
	console.log('button clicked')
	const xhr = new XMLHttpRequest()
	xhr.open('GET', '/checkauth', true)
	const user = window.document.querySelector('input[name="username"]').value
	const pass = window.document.querySelector('input[name="password"]').value
	const token = btoa(`${user}:${pass}`)
	console.log(`token: ${token}`)
	xhr.setRequestHeader('Content-type', 'application/json')
	xhr.setRequestHeader('Authorization', `Basic ${token}`)
	xhr.send()

	xhr.onreadystatechange = () => {
		if (xhr.readyState === READY) {
			console.log(`status: ${xhr.status}`)
			if (xhr.status === OK) {
				console.log('good credentials')
				//const data = JSON.parse(xhr.responseText)
				//console.log(data)
				const token = btoa(`${user}:${pass}`)
				console.log(token)
				sessionStorage.token = token
				sessionStorage.setItem('token', token)
				window.location.replace('/')
			} else {
				console.log('bad credentials')
			}
		}
	}
})
