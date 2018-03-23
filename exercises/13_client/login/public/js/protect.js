
'use strict'

const UNAUTHORIZED = 401

const token = sessionStorage.getItem('token')

console.log(`stored token: ${token}`)

// if the token is missing we immediately redirect to the login page.
if(!sessionStorage.token) {
	console.log('no token found')
	window.location.replace('/login')
}
/**
 * We send the current authentication token in the 'Authorization header like this:
 * Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
 * This is called 'basic access authentication'.
 */
const xhr = new XMLHttpRequest()
xhr.open('GET', '/checkauth', true)
xhr.setRequestHeader('authorization', `basic: ${token}`)
xhr.onreadystatechange = () => {
	if (xhr.readyState === xhr.DONE) {
		console.log(`status: ${xhr.status}`)
		if (xhr.status === UNAUTHORIZED) {
			console.log('unauthorised')
			window.location.replace('/login')
		}
	}
}
xhr.send()
