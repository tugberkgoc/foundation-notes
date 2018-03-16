
'use strict'

console.log(document)

window.onload = () => {
	console.log('window onload')
}

// we can select parts of the DOM by its ID.
document.getElementById('save').onclick = () => {
	console.log('save')
	const name = document.querySelector('#userForm input[type="text"]')
	console.log(name)
	document.querySelector('#summary h1').innerHTML = name.value
	const data = document.querySelectorAll('#userForm input')
	console.log(data)
	const paragraphs = document.querySelectorAll('#summary p')
	console.log(`found ${paragraphs.length} p tags`)
	paragraphs[1].innerHTML = 'Hello World!'
}

// we can also use a CSS selector to select a part of the DOM.
document.querySelector('#userForm input[type="email"]').onkeypress = () => {
	console.log('updating email')
	const email = document.querySelector('#userForm input[type="email"]').value
	document.querySelector('#summary p').innerHTML = email
}
