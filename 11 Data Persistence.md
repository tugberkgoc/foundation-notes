
# Data Persistence

Before you start this worksheet make sure you have the latest lab materials:

```shell
$ git stash
$ git pull origin master
$ git stash pop
```

You should refer to the [presentation](https://drive.google.com/open?id=1sS2q9MYZL9pftgvTZqwppmpg0Ajq21poOxcCJ93FuzQ) to support you as you work through the worksheet.

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

If you are familiar with relational databases you can opt to store your data in either sqlite or mysql. Here we will be using sqlite which creates a single file database (much like Microsoft Access). Use the terminal to navigate to the `03_sqlite/web/` directory, start the script and open the web page in your browser.

1. In the terminal you will see the message `Connected to the "todo" SQlite database`.
    1. If you look in the project directory you will see a new file `todo.db`, this is the database.
    2. The terminal window shows the SQL statement that creates our table, `CREATE TABLE IF NOT EXISTS items(list text, item text)`
2. Use the form to add an `apple` to your list and click on the **Add** button:
    1. Notice that the data `?item=apple` has been passed in the url, this is because the form method is set to `GET`.
    2. Notice that the item is listed under the form.
    3. The list is called **main**.
    4. If you look at the terminal output you will see the SQL statement used to insert a new record, `INSERT INTO items(list, item) VALUES("main", "apple")`.
    5. Underneath this you will see the SQL statement that retrieves the data to display in the list, `SELECT item FROM items WHERE list = "main"`.
    6. Add some more items to your list using the form.
3. Edit the URL in the web browser to be `?list=cheese&item=gouda` then press enter:
    1. What is the name of the list?
    2. What items are listed?
    3. How have the SQL statements changed?
4. Use the form to add two more cheeses:
    1. What is happening to the URL?

Now lets examine the code. Open the `index.js` file:

1. We require the `sqlite3` module and import it in _verbose_ mode.
2. We create a new `SQLite.Database()` object, this takes 2 parameters:
    1. The name of the database.
    2. A callback that executes once the database has been created. It has a single parameter that indicates whether an error has ocurred.
    3. Any code needed to create tables in placed inside this callback.
3. In the base route `/` we retrieve data from the querystring in the URL:
    1. The item to be added.
    2. The list to add the item to, this might not be provided so we need to supply a default value.
4. The SQL statement is constructed as a string and passed to the `db.run()` function which takes this and a callback that is run once the SQL command has been executed.
5. We can retrieve the records that correspond to the selected list by creating an SQL statement in a string and passing it to  the `db.all()` function which also takes a callback function with two parameters:
    1. The SQL statement.
    2. An array containing all the records returned.
5. next we pull together the data to insert into the template:
    1. Pass the name of the list
    2. The records turned into a string with HTML elements.

### 2.1 Connecting Directly to the Database

If you have the `sqlite` or `sqlite3` tools installed on your computer you can connect to your database using the terminal. If you are using a cloud-based IDE or running Ubuntu locally you can use the following commands:

```shell
$ sudo apt-get update.
$ sudo apt-get install sqlite3 libsqlite3-dev.
```

If you are using a Mac, sqlite3 is already installed.

Use the terminal to navigate to the directory containing the `todo.db` file then open it using `sqlite3 todo.db`. You will see a `sqlite>` prompt. Try the following commands, can you work out what they do? You will find these useful when you attempt the tasks in _Test Your Understanding_.

```sql
sqlite> SELECT * FROM items;
sqlite> .mode column
sqlite> SELECT * FROM items;
sqlite> .headers on
sqlite> SELECT * FROM items;
sqlite> SELECT * FROM items WHERE list="main";
sqlite> SELECT item FROM items WHERE list="main";
sqlite> SELECT DISTINCT item FROM items WHERE list="main";
sqlite> SELECT COUNT(item) as qty FROM items WHERE list = "main" AND item = "apple";
sqlite> SELECT COUNT(item) as qty FROM items WHERE list = "main" AND item = "unknown";
sqlite> .exit
```

### 2.1 Test Your Understanding

1. Modify the HTML form to let the user choose which list they want to add the item to.
2. Modify the code so that an item is only added if it is not already in the specified list.
3. Modify the database table so it includes a quantity field (set the data type to _NUMERIC_), you will need to delete the database before doing this.
    1. Make sure the column defaults to a value of `1` by setting the data type to `INTEGER DEFAULT 1`.
4. Before adding an item to the database, check if the item already exists and if so, simply increment the `quantity` value.
5. Display the list as a 2 column HTML table with the second column displaying the quantity.
6. Create a third column with a delete link, this should remove the item from the database.
