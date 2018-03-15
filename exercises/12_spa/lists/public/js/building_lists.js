
'use strict'

const request = new XMLHttpRequest()
request.open('GET', 'data/books.json', false)
request.send(null)
const data = JSON.parse(request.responseText)
console.log(data)

const books = data.books

const list = document.createElement('ol')

// for (var i=0; i < books.length; i++) {
// 	console.log(books[i].title)
// 	const item = document.createElement('li')
// 	item.innerHTML = books[i].title
// 	list.appendChild(item)
// }

for(const book of books) {
	console.log(book.title)
	const item = document.createElement('li')
	item.innerHTML = book.title
	list.appendChild(item)
}
document.body.appendChild(list)
