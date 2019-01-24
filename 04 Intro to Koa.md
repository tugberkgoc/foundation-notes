
# The Koa Web Server

In this worksheet you will be learning the basic principles involved in building a multipage website using the Koa web server and the JavaScript language. In previous worksheets you have been running a koa server but in this lab we will be taking a deep dive into its inner workings and will also be learning how to program using the JavaScript language.

For this lab **Assume this is being covered as the first step in learning JS**.

## 1 JavaScript

The third skill you will need, after HTML5 and CSS3 is the ability to control the operation of your website by writing scripts using a suitable programming language. There are many languages to choose from such as Python, PHP or Java however in this module you will be using the JavaScript language.

There are a huge range of language features but this worksheet will focus on those that are directly relevent to the assignment. You are encouraged to study the language in more depth. It is assumed you are comfortable with core programming principles using the _Python_ language.

Javascript (more correctly known as ECMAscript) has been around since the mid 1990s and has acquired a bad press due to some of its badly implemented features that can introduce bugs into your code. In the last couple of years it has changed considerably and version 6 often referred to as ECMA6 (the version you will be using) is now considered a flexible, powerful scripting language.

You will sometimes hear different names used for this language:

1. **JavaScript** is the original name when the language was developed by Netscape.
2. **ECMAScript** is the name of the language standard developed by ECMA, from the original Javascript implementation.
3. **NodeJS** is JavaScript running on a web server using the language intepreter from the Chrome Web Browser.

Basically these are all implementations of the _same language_ but in this chapter we will focus on programming using NodeJS since it offers a more consistent interpreter and you will find it the most useful for your websites. In later chapters we will move JavaScript to the web browser.

**Warning: most online tutorials have been written using the older flavours of JavaScript. You should not rely on these giving you the correct information.**

We must _avoid using_ this older style and this worksheet will only cover the most up to date implementation of the language.

## 1.1 NodeJS

Traditionally JavaScript ran in the web browser and was used to carry out tasks such as animation and form validation. Recently however the Chrome JavaScript interpreter (called V8) has been modified to run on the server which means we can use JavaScript as a replacement for the older server-side languages such as PHP.

There are a number of benefits over other web scripting languages:

The first, and most obvious answer, is that, as a web developer, you are going to have to learn JavaScript anyway because its the only language that will run natively in a web browser so why not use the same language for both client and server?

The second benefit, and one we will return to in later chapters, is that, unlike other scripting languages which create a new process for each connected user, NodeJS runs a single process shared between all users. Since processes are expensive in computing resources it means that a NodeJS deployment is far more scalable. In chapter 3 we will learn how it handles concurrency through the use of threads.

The downside of only having a single process is that the script can only handle thing at a time. To write efficient scripts it is therefore important to avoid waiting for jobs to complete and the language makes use of concepts such as asynchronous _callbacks_ to improve efficiency. We will be covering this important topic later in the worksheet.

### 1.2 Packages

One of the most valuable features of NodeJS is its package manager which allows you to install additional functionality in the form of packages. There are thousands of these to choose from, fully documented on the [Node Package Manager website](https://www.npmjs.com). Later on you will be shown how you can publish your own packages.

Packages can be installed either locally or globally.

1. Local packages are installed in a `node_modules/` directory within the directory containing the NodeJS scripts. This is the way we install most of the modules. These are only available within that directory.
2. Global packages on the other hand are installed system-wide and can be accessed by all the scripts. Normally these need to be installed using root privileges. We will be using global packages in a later chapter. We won't be installing many scripts in this way.

We install packages using the `npm install` command. Modules can be deleted using `npm uninstall` and you can see a list of the modules you have installed in the current directory using `npm ls`.

Start by opening the `index.js` script in the 

Use the terminal tool to access the `exercises/06_routing/` directory and ope

**TODO: Koa example of installing uninstalling and listing packages.**

## 2 Koa Web Server

We will be using the [Koa](https://koajs.com) framework as our web server in this module. Koa was designed by the team who created the [Express Framework](https://expressjs.com) which was one of the first mainstream web servers to use the JavaSscript language. Almost all the online tutorials cover the use of Express so why have we chosen not to use this?

**TODO: why use koa**

Study the `index.js` script in the `exercises/02_http/01_url/` directory.

1. The first line is the _shebang_, it tells the script what application is needed to run it. If the file is _executable_ you can simply call this without using the node command like this: `./index.js` instead of `node index.js`.
2. If you study lines 4-10 of `index.js` you will see a list of the modules we need to install.
3. Lines 4-10 import the module packages we need for our script to work. Koa is a modular framework, on its own it does very little but depends on plugins (middleware) for its functionality.
4. Lines 11-15 are where we configure the koa _middleware_.
5. We need two global variables in our script, one to store a list of items and the second to store the port number we will be using:
	1. The `let` keyword defines a _mutable variable_ which can change its value.
	2. The `const` keyword defines an _immutable variable_. Once a value is assigned it cannot be changed, these are sometime called _constants_.
6. The main part of the script defines the _routes_ and we will be covering these in more detail as we progress through the lab.
7. Right at the end (line 123) we start the server on the defined port and _export_ the _koa object_ `app`. By exporting it we can import the script into our automated test suite (briefly covered in the previous lab).

--------

Contents:

1. Package Manifests
2. Routes
3. Request and response objects
4. Templating
5. Modular code

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

## 3 Modular Code

Un until now, all your JavaScript/NodeJS code has been in a single file (commonly named `index.js`). Whilst this works for small scripts, as your scripts get longer it becomes increasingly difficult to manage. The solution is to _modularise_ your code by splitting it up into several different files.

### 3.1 Reducing the Size of the Routes File

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

#### 3.2 The Exports Object

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

### 3.3 Private Functions

Any function in a module that has not been added to the `module.exports` object is visible only to other code in the module (private scope). locate the `buildString` function. Notice that this is a standard function that is used to build the correct URL. It is used in the `betterSearchString` function literal and replaces a block of inline code.

### 3.4 Test Your Understanding

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
