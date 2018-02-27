
# The Express Web Server

In the previous worksheet you learned the basics of the JavaScript language. In this worksheet you will be applying these skills to understand how to use the NodeJS Express module to host a dynamic website. It is vitally important that you have completed all the exercises in the previous worksheet before continuing.

By the end of this worksheet you will be able to build simply dynamic websites using Express.

Contents:

1. Package Manifests
2. Routes
3. Request and response objects
4. Templating
5. Modular code

Before you start this worksheet make sure you have the latest lab materials:

```shell
$ git stash
$ git pull origin master
$ git stash pop
```

## 1 Package Manifests

A package manifest is an json-formatted file called `package.json` that is created in the root directory of a NodeJS application. I describes the application (name, author, etc), the _entry point_ (the script that needs to be run to launch the application) and identifies the third-party packages (including their specific versions) needed to run the application. It also supports development be defining the packages needed to support the code _development_ and also allows us to define command _aliases) which means we don't need to type in complex commands.

The real benefit to having dependencies defined like this in package.json, is that it becomes possible to install the correct versions of all the required packages with a single command. This means that we could use an automated build and deploy tool.

### 1.1 Understanding the Manifest

Let's look at a simple example. You can find this in the `examples/06_express/todo/` directory. Open the `package.json` file:

1. The first few keys define the project name, author name, etc.
2. The `main` key contains the script that should be run to start the application, in this example, `index.js` is the _entry point_ to our application. This is mainly used by automated build-deply tools so they know how to start the app.
3. Next there is a `scripts` object. This is where we can define _script aliases_. These store complex commands and allow them to be executed using shorter commands:
    1. try running `npm run hello`.
    2. Can you see what has happened?
    3. Try `npm run start`.
    4. Because this is such a useful command we can abbreviate it to `npm start`, try this.
4. After this there is a `dependencies` object. This lists all the packages needed for the application to run.
    1. Instead of installing each package separately try the command `npm install --only=production`.
    2. Now lets see what packages were installed using `npm list --depth=0`. You should see that the `express` package was installed. The package version should match that specified in the `dependencies` object.
5. The final object is called `devDependencies` and contains all the packages needed to _develop_ the application.
    1. Lets install these packages using `npm install --only=dev`. This will install the `eslint` package.
    2. List the locally-installed modules again using `npm list --depth=0` to make sure the package was installed.

You have probably spotted another file called `package-lock.json`. This contains a list of _all_ packages installed indicating their dependencies plus details of all dependencies.

### 1.2 Creating and Editing the Manifest

Now we understand the contents of the manifest we will create one from scratch.

1. Open the SSH Terminal and navigate to the `exercises/06_express/todo/` directory.
2. Delete the current manifest using `rm package.json` and the package lock file using `rm package-lock.json`.
3. Delete the `node_modules/` directory using `rm -rf node_modules`
4. Run the manifest wizard using `npm init` and choose the default options by pressing enter for each question. This will create a new `package.json` file.
5. Install the `express` package using `npm install --save express`. The `--save` flag adds the package to the manifest file in the `dependencies` object.
6. Install the `eslint` package using `npm install --save-dev eslint`. The `--save-dev` flag adds the package to the manifest file in the `devDependencies` object.
7. Open the `package.json` and check that these two packages are listed.
8. add a `hello` object to the `scripts` object and set its value to `"echo HelloWorld!"`.

## 2 Routing

1. Start by locating the `exercises/06_express/todo/` directory and locate the `index.js` file. This is the routing file used by the express web server.
2. The first few lines import the package and configure the server:
    1. Lines 3-4 import the express package and create an instance called `app`.
    2. Next the port number is stored in a constant. You should always handle numbers by assigning to constants to make their purpose clear.
3. Next, on lines 9-11 we define a _route_. This has two parameters:
    1. The path to match. In this case, the `/` represents the base url with no additional segments.
    2. The function to run if this route is accessed. In this case it loads the contents of the `coventry.html` file and sends it back to the web browser.
4. Finally we tell express to listen on the specified port. There are two parameters:
    1. The port.
    2. A function to run as soon as the server is ready to receive requests.
    3. Now open the SSH Terminal and navigate to the directory, install the `express` package and run the `index.js` file.
    4. Finally you need to open a browser tab and navigate to the base URL on the correct port. You will see the following:

### 2.1 Routes

Every _request_ sent from the client is handled by a route. The server compares the requested HTTP method and route against the strings passed as the first parameter until it finds a match. If there are no routes that match the specific URL the express server will repond with a `404 NOT FOUND` response.

When a match is found, the server runs the _callback_ (anonymous function) that has been supplied as the second parameter. This function takes three parameters:

1. A `request` object that contains all the data passed as part of the HTTP request headers.
2. A `response` object that will contain the data to be returned the the client as part of the response.
3. A `body` object that contains the string passed as the _request body_.



```javascript
app.get('/test', (req, res, body) {
    // code goes here
})
```

use the todo/ example

### 2.2 The Request Object

The `request` object that contains all the data passed as part of the HTTP request headers and body. it contains all the information from these headers, in particular, given the request:

```
http://www.example.com/hello/mark?gender=male
```

| Object         | Contains              | Example           |
| -------------- | --------------------- | ----------------- |
| `req.query`    | The querystring       | `gender=male`     |
| `req.body`     | The request body      | -                 |
| `req.hostname` | The server hostname   | `www`             |
| `req.baseUrl`  | The base URL          | `www.example.com` |
| `req.path`     | The route             | `/hello/mark`     |
| `req.ip`       | The server IP address | `192.168.0.1`     |
| `req.params`   | The parameters        | `/mark`           |

req.accepts(types) Checks if the specified content types are acceptable, based on the request’s Accept HTTP header field. The method returns the best match, or if none of the specified content types is acceptable, returns false (in which case, the application should respond with 406 "Not Acceptable"). req.accepts('html')

req.get(field) Returns the specified HTTP request header field (case-insensitive match). The Referrer and Referer fields are interchangeable. req.get('Content-Type')

### 2.3 The Response Object

The response object contains the data to be returned to the client as the HTTP response. It contains a number of functions.

| Function          | Description                                         | Example                                      |
| ----------------- | --------------------------------------------------- | -------------------------------------------- |
| `res.write()`     | adds text to the response body                      | `res.write('hello world')`                   |
| `res.send()`      | sends text to the response body and sends to client | `res.send('hello world')`                    |
| `res.setHeader()` | adds a new response header                          | `res.setHeader('content-type', 'text/html')` |
| `res.sendFile()`  | sends the contents of a file to the client          | `res.sendFile(\`${__dirname}/form.html\`)`   |
| `res.status()`    | sets the HTTP status                                | `res.status(201)`                            |
| `res.end()`       | sends the current response body to the client       | `res.end()`                                  |

currency/ example

## 3 Templating

Up to now you have seen two ways the server can send response data to the client web browser:

1. Sending the contents of an HTML file. This is great for complex web pages but you can't include dynamic data.
2. Using the `res.write()` and `res.send()` to send dynamic data. The limitation is that its quite clunky and would be completely inpractical for complex web pages.

In this section you will be introduced to a third approach which combines the best features of each the other two approaches. Locate the files in the `exercises/06_express/template/` directory.

There are a number of templating engines that are compatible with Express however in this worksheet we will be using one of the simplest ones, called . This needs to be imported into your script.

```javascript
const es6Renderer = require('express-es6-template-engine')
const app = express()
app.engine('html', es6Renderer)
app.set('views', 'html')
app.set('view engine', 'html')
```

Notice that we import the renderer then set it as the default html engine. We then tell the server where to find the html templates and finally set the view engine to html.

Any data we want to be embedded in the template needs to be added to a JavaScript object (`data` in this example). Finally we call the `render()` function of our response object (`res`) and pass it two parameters:

1. The name of the template file (without the file extension).
2. An object containing a `locals` key. This should contain the data we wish to insert in the template.

```javascript
const d = new Date()
const data = {
  title: 'My First Template',
  date: `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()}`
}
res.render('index', {locals: data})
```

The template file needs to have placeholders to indicate where the dataa should be inserted.

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body>
    <h1>${date}</h1>
  </body>
</html>
```

You can see a complete example in the `template/` directory.

### 3.1 Test Your Understanding

1. Create a css file and link it to the html template. Add some rules to improve the appearance of the page.
2. Display the date in a paragraph tag.
3. Change the top level heading to display the same information as the page title.
3. Add a table to display the following with explanations:
    1. The server hostname
    2. The IP address of the server
    3. The base URL
    4. The route

### 3.2 Repeating Data

In the previous example you have seen how to insert single values into a web page but how to we display lists of data? A list is stored in an **array** in JavaScript so the first task is to ensure your data is in an array. Once this is done we can send the entire array to the template in the same way we sent single values.

```javascript
const food = ['bread', 'butter', 'jam']
const data = {
  foodStuffs: data
}
```

The magic happens in the template. You can insert any valid JavaScript expression in the template placeholder and whatever is _returned_ will be inserted into the html page.

```html
<ol>
${foodStuffs.map(f => `<li>${f}</li>`).join('')}
</ol>
```

In the example above, we manipulate each array index by adding `<li>` elements around them. We then take the new array and use `join()` to turn it into a single string. The result is then inserted inside the `<ol>` element.

### 3.3 Test Your Understanding

Open the `currency/` directory and examine both the `index.js` and `index.html` files to see a slightly more complex example.

1. Create a stylesheet linked to the html template.
    1. Add some rules to improve the appearance of the page.
2. Modify the template to display the currency and rates in a table.
3. Without adding any more html, colour every other row of the table in light grey.
4. Display the conversion rates to 2 decimal places.
5. Add a second text box to enter the amount of the base currency to convert.
    1. Display the amount of each currency you would get in a third column.
    2. Don't forget to include the currency code!

### 3.4 Mixing Structure and Logic

Can you spot the problem with the templating solution? In our previous examples we have always kept the _layout_ in the html file, the _appearance_ in the css file and all logic in the js file. By putting the `map()` function in the html template file we are starting to mix the concerns and this is not a good thing. Whilst we can't avoid this, there are steps we can take to minimise its impact.

If you think about how we did this you might have spotted an alternative approach: we could have created a string containing the data in the js file and passed this to the template. So why is this a bad thing?

In the `currency/` example we have added a small amount of js code to the template file but the script file contains no html. If we build the string in the js file we start introducing structural elements into the script file which prevents us from changing our minds about how to display the data (we are _baking in_ the structure).

#### 3.1.2 Test Your Understanding

Display a list of data on one of your web pages. You could choose from a ordered or unordered list, a definition list (as in the example) or even a table.

## 4 Modular Code

Un until now, all your JavaScript/NodeJS code has been in a single file (commonly named `index.js`). Whilst this works for small scripts, as your scripts get longer it becomes increasingly difficult to manage. The solution is to _modularise_ your code by splitting it up into several different files.

### 4.1 Reducing the Size of the Routes File

Your first step should be to remove as much code as possible from your main routes file. The file should handle the http requests and send back the response but nothing else. let's look at an example.

Open the `books/index.js` file. This file contains 2 routes, `/bad` and `/good`. Start the server and view the `/bad` route which should display a form which allows you to search for a book. Try searching for books on different topics to see how this works.

As you search:

1. Examine the URL used and identify any query parameters.
2. Study the `index.html` template file to understand how the data is rendered.
3. Study the code in the routes file. Notice there are two nested callbacks.

You have probably noticed that there is a lot of code in the `/bad` route! This code does 2 different tasks:

1. It contains the business logic to make API requests and tidy the data.
2. It also takes this data and sends it back to the browser as an HTTP response.

This is why the code is hard to read. It therefore makes the code difficult to maintain and new features are likely to introduce bugs. Later on, when we start automating our code testing we would quickly discover this code is very difficult to write tests for. To fix this we need to separate out the business logic from the routing.

#### 4.2 The Exports Object

Every NodeJS file includes a special `module` object that represents the current module. It contains a nested object called `exports`. Anything in this `exports` object will be exposed (public) whenever this module is imported and used.

```javascript
// basic.js

module.exports.name = 'John Doe'

module.exports.hello = (name, callback) => {
  // code goes here.
  return callback(null, `hello ${name}`)
}
```
In this example, the `name` property is available to any script importing this module. We also have a function expression in the `hello` property.

To use this we need to import this `basic.js` module.

```javascript
const basic = import('./basic')

console.log(basic.hello)

basic.hello('Mark', (err, data) => {
  if(err) console.log('an error has occurred')
  console.log(data)
})
```

Let's look at a more useful example! Open the `books/books.js` file. Notice that there is a function expression stored in the `module.exports.searchByString` property. This means it is visible outside the module. This takes the data from the request and returns books based on the search query, it does not add this data to the template or return it to the client.

Now look at the `index.js` file and locate the `/good` route. You can see immediately that there is a lot less code. The code here calls the `searchByString()` function expression and then uses the callback to add the data to the template and send the response to the client.

### 4.3 Private Functions

Any function in a module that has not been added to the `module.exports` object is visible only to other code in the module (private scope). locate the `buildString` function. Notice that this is a standard function that is used to build the correct URL. It is used in the `betterSearchString` function literal and replaces a block of inline code.

### 4.4 Test Your Understanding

1. Modify the template to display the data as a 3 column table with the title in the first column, the ISBN in the second and the unique id in the third.
2. Add a hyperlink to the title to link to the route `/book/XXXXX`, where XXXXX is the unique ID of that book.
    1. Now remove the third column.
    2. Clicking on these links will display a message 'page not found'.
3. Create a new route to handle this, the route will be `/book/:id`. This should initially just display the id of the book on the page.
    1. You can access the ID value in your script using the `req.params.id` object.
4. Create and export a new function literal in the `books.js` file, this should retrieve the book title, description and author(s) and display these:
    1. Use the URL `https://www.googleapis.com/books/v1/volumes/XXXXX` to retrieve the book details (where XXXXX is the book ID).
    2. Print this to the console to identify the structure.
    3. Extract the data and print to the console.
    4. Build a new html template called `book.html` to display the information.
5. Create a back button to return to the search results.
    1. How can you ensure the search results are still there when you click on this button?
6. Can you replace the callbacks with promises/async functions?
7. Can you split the code logic into multiple functions?
