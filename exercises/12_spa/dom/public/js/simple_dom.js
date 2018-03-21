
'use strict'

window.addEventListener('load', () => {
	console.log('window \'load\' event triggered')
	console.log(window.document)
})

// we can use a CSS selector to select a part of the DOM.
const emailField = window.document.querySelector('#userForm input[type="email"]')
emailField.onkeypress = () => {
	console.log('updating email')
	const email = document.querySelector('#userForm input[type="email"]').value
	console.log(email)
	window.document.querySelector('#summary p').innerHTML = email
}

// we can also select parts of the DOM by its ID.
window.document.getElementById('save').onclick = () => {
	console.log('save')
	const name = window.document.querySelector('#userForm input[type="text"]')
	console.log(name)
	window.document.querySelector('#summary h1').innerHTML = name.value
	const data = document.querySelectorAll('#userForm input')
	console.log(data)
	const paragraphs = window.document.querySelectorAll('#summary p')
	console.log(`found ${paragraphs.length} p tags`)
	paragraphs[1].innerHTML = 'Hello World!'
}
