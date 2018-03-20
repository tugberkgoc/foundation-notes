
'use strict'

const request = new XMLHttpRequest()
request.open('GET', 'data/books.json', null)
request.send(null)
const data = JSON.parse(request.responseText)
console.log(data)

const books = data.books

const list = window.document.createElement('ol')

for (let i=0; i < books.length; i++) {
	console.log(books[i].title)
	const item = window.document.createElement('li')
	item.innerHTML = books[i].title
	list.appendChild(item)
}

window.document.body.appendChild(list)

//request.open('GET', 'data/books.json', null)
