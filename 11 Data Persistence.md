
# Data Persistence

Before you start this worksheet make sure you have the latest lab materials:

```shell
$ git stash
$ git pull origin master
$ git stash pop
```

## 1 Filesystem

Since NodeJS can access the filesystem on the server, the simplest possible approach to store data is to encode it as a JSON string and save this to a text file (either with a `.json` or `.txt` extension). This uses the [fs](https://nodejs.org/api/fs.html) module which is installed by default but will still need importing into your project.

In this first, simple example of persisting data, every time we modify the array of items we convert the entire array to a json string and save it as a text file. Locate the `01_filesystem/todo.js` script and run it as follows (notice the extra argument):

```shell
$ node todo cheese
```

1. Add three types of cheese.
2. exit the script.
3. Relaunch the script in the same manner and immediately use the `list` command.
    1. What do you see?
    2. Locate the `data/cheese.json` file and examine its contents.
4. Create a new `fruit` list and add three items of fruit.

Now open the `01_filesystem/index.js` script and note:

1. We need to import the `fs` package to be able to work with the filesystem.
2. We define the name of the directory we want to store the data files in.
    1. We use `fs.existsSync()` to see if it already exists.
    2. If it does not exist we use `fs.mkdirSync()` to create it.
3. All the information entered when we ran the script is stored in the `process.argv[]` array.
    1. We look for the third index and use this as the name of our file. If this does not exist we default to `data` as the filename.
4. We look to see if there is already a file with the corresponding name and if it exists:
    1. We load the contents (a file buffer), convert to a UTF8 string and store it in the `data` variable.
    2. We parse the json string into a JS object and store this in the `items[]` array.
5. Every time we `push()` an item to the `items[]` array:
    1. We convert the `items[]` array into a json string.
    2. We save to the file, overwriting any existing content.

Whilst this is a quick and easy way to persist data there are some limitations:

1. We have to convert and save the entire object every time we change it. For a small file this is not an issue but it can become a big problem when we have lots of data.
2. The file can't be easily searched or sorted so we have to import it and convert to JS objects first.

### 1.1 Test Your Understanding

1. Implement a new option to _remove items_ from the list. For example when the user enters the command `remove bread`, the appropriate item is removed from the list (hint: you have already solved this problem in a previous lab...).
    1. How can you persist these changes?
2. You now have some duplicate code in your script. Create a new function called `save()` to handle saving the data and call this where needed.
3. the `fs.readdirSync()` returns an array of all the files in the specified directory:
    1. Add a new command to the list app called `getlists` that lists all the files in the data directory.
    2. Display these without the `.json` file extension.
4. Add another command called `load` that allows the user to switch to a different stored list. For example to switch to the `cheese.json` list they would enter `load cheese`.
    1. The program should create a new empty list if the list does not exist.

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
