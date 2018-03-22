
'use strict'

console.log('page loaded')

const btn = window.document.querySelector('button')
btn.addEventListener('click', () => {
	const newItem = document.querySelector('input').value
	let items = []
	console.log(localStorage.items)
	if(localStorage.items !== undefined) {
		items = JSON.parse(localStorage.items)
	}
	items.push(newItem)
	localStorage.items = JSON.stringify(items)
})

// const items = localStorage.items ? JSON.parse(localStorage.items) : []