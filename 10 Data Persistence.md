
# Data Persistence

## 1 Filesystem

Stores text in file against key

Formatted as JSON data

Easy to store and retrieve by key

Simple to implement

Difficult to query

```javascript
const storage = require('node-persist')
storage.initSync()

exports.addBook = function(isbn, callback) {
  const data = {
    title: 'The Hobbit',
    authors: 'J.R.R. Tolkien',
    description: 'Hobbit finds ring...'
  }
  storage.setItemSync(isbn, data)
}
```

## 2 SQLite Database

http://www.sqlitetutorial.net/sqlite-nodejs/

## 2 Document Database

Stores JavaScript objects

Can be queried using JavaScript

### 2.1 Installing MongoDB

There are several ways to access a MongoDB database. You can make use of a cloud provider such as [mLab](https://mlab.com) or you can install the database locally on your development machine.

#### 2.1.1 Installing on Ubuntu

#### 2.1.2 Installing on MacOS

The best way to install it on a Mac is to use the [Homebrew](https://brew.sh) package manager. The installation instructions can be found in the introductory chapter of this book. To install MongoDB

```shell
$ brew install mongodb
```

You need to create a data directory and change its permissions before starting the database server.

```shell
$ mkdir -p /data/db
$ sudo chown -R `id -un` /data/db
$ mongod
```

Mongoose Example.

Start by defining a _schema file_:

```javascript
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  authors: String,
  description: String
})
const Book = mongoose.model('Book', bookSchema)
module.exports = Book
```

Storing a document.

```javascript
const book = new Book({
  title: data.title,
  authors: data.authors,
  description: data.description
})

book.save( function(err, book) {
if (err) {
    callback( Error(`database error: ${err}`) )
  }
  return callback(null, book)
})
```

## 3 Relational Database

```javascript
const mysql = require('mysql')
const request = require('request')

const connection = mysql.createConnection({ host: 'xxx', port: '3306', user: 'xxx', password: 'xxx', database: 'xxx' })

const sql = 'INSERT INTO books (id, title, authors, description) VALUES (NULL, "The Hobbit, "J.R.R. Tolkien", "Ring found")'

connection.query(sql, (err, rows) => {
  if (err) callback( Error(`database error: ${err}`) )
  return callback(null, rows)
})
```
