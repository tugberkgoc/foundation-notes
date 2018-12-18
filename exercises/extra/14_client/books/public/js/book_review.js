'use strict'

console.log('page loaded')

const minStrLen = 2
const status = {
	'OK': 200
}
const xmlStatus = {
	notInitialized: 0,
	connected: 1,
	received: 2,
	processing: 3,
	ready: 4
}

document.getElementById('bookSearch').onkeyup = searchPrep

function searchPrep() {
	console.log('search')
	const text = document.getElementById('bookSearch').value
	if (text.length > minStrLen) {
		console.log('start search')
		search2(text)
	}
}

function search2(text) {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', `https://www.googleapis.com/books/v1/volumes?q=${text}`, true)
	xhr.onreadystatechange = () => {
		console.log(xhr.readyState)
		if (xhr.readyState === xmlStatus.ready) {
			if (xhr.status === status.OK) {
				const data = JSON.parse(xhr.responseText)
				const books = data.items
				const table = document.getElementById('searchResults')
				table.innerHTML = ''
				for(let i=0; i<books.length; i++) {
					const row = document.createElement('tr')
					row.innerHTML = `<td>${books[i].volumeInfo.title}</td>`
					table.appendChild(row)
				}
			} else {
				console.error(xhr.statusText)
			}
		}
	}
	xhr.send(null)
}
