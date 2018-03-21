
'use strict'

console.log('page loaded')

document.querySelector('button').onclick = () => {
	const newItem = document.querySelector('input').value
	const items = localStorage.items ? JSON.parse(localStorage.items) : []
	items.push(newItem)
	localStorage.items = JSON.stringify(items)
}
