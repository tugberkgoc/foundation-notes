
'use strict'

console.log('page loaded')

const btn = window.document.querySelector('button')
btn.addEventListener('click', () => {
	const newItem = document.querySelector('input').value
	const items = localStorage.items ? JSON.parse(localStorage.items) : []
	items.push(newItem)
	localStorage.items = JSON.stringify(items)
})
