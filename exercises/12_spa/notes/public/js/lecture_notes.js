
'use strict'

const notes = []

// this adds an event to the add button to display the add screen
document.querySelector('[href="#add"]').addEventListener('click', () => {
	console.log('add note')
	document.getElementById('listPage').style.display = 'none'
	document.getElementById('addPage').style.display = 'block'
})

// this adds an event to the edit button to display the edit screen
document.querySelector('[href="#list"]').addEventListener('click', () => {
	console.log('list notes')
	document.getElementById('listPage').style.display = 'block'
	document.getElementById('addPage').style.display = 'none'
	const list = document.createElement('ol')
	for(const note of notes) {
		console.log(note.title)
		const item = document.createElement('li')
		item.innerHTML = note.title
		list.appendChild(item)
	}
	document.querySelector('#listPage').innerHTML = ''
	document.querySelector('#listPage').appendChild(list)
})

document.querySelector('#addPage button').onclick = () => {
	console.log('add note')
	const title = document.querySelector('#addPage input').value
	const note = document.querySelector('#addPage textarea').value
	notes.push({title: title, note: note})
	console.log(notes)
}
