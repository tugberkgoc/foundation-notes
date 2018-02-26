
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

use the todo/ example

### 2.2 The Request Object

```javascript
req.query // querystring object
req.body
req.hostname
req.baseUrl
req.path
req.ip
req.params // /xxx/:yyy
```

req.body Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser

req.query This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.

req.accepts(types) Checks if the specified content types are acceptable, based on the request’s Accept HTTP header field. The method returns the best match, or if none of the specified content types is acceptable, returns false (in which case, the application should respond with 406 "Not Acceptable"). req.accepts('html')

req.get(field) Returns the specified HTTP request header field (case-insensitive match). The Referrer and Referer fields are interchangeable. req.get('Content-Type')

### 2.3 The Response Object

```javascript
res.write()
res.send()
res.setHeader('content-type', 'text/html')
res.sendFile(`${__dirname}/form.html`)
res.end()
```

currency/ example

## 3 Templating

Up to now you have seen two ways the server can send response data to the client web browser:

1. Sending the contents of an HTML file. This is great for complex web pages but you can't include dynamic data.
2. Using the `res.write()` and `res.send()` to send dynamic data. The limitation is that its quite clunky and would be completely inpractical for complex web pages.

In this section you will be introduced to a third approach which combines the best features of each the other two approaches. Locate the files in the `exercises/06_express/template/` directory.

use the template/ example.

### 3.1 Repeating Data

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

Open the `currency/` directory and examine both the `index.js` and `index.html` files to see a slightly more complex example.

#### 3.1.1 Mixing Structure and Logic

Can you spot the problem with the templating solution? In our previous examples we have always kept the _layout_ in the html file, the _appearance_ in the css file and all logic in the js file. By putting the `map()` function in the html template file we are starting to mix the concerns and this is not a good thing. Whilst we can't avoid this, there are steps we can take to minimise its impact.

If you think about how we did this you might have spotted an alternative approach: we could have created a string containing the data in the js file and passed this to the template. So why is this a bad thing?

In the `currency/` example we have added a small amount of js code to the template file but the script file contains no html. If we build the string in the js file we start introducing structural elements into the script file which prevents us from changing our minds about how to display the data (we are _baking in_ the structure).

#### 3.1.2 Test Your Understanding

Display a list of data on one of your web pages. You could choose from a ordered or unordered list, a definition list (as in the example) or even a table.

## 4 Modular Code

Un until now, all your JavaScript/NodeJS code has been in a single file (commonly named `index.js`). Whilst this works for small scripts, as your scripts get longer it becomes increasingly difficult to manage. The solution is to _modularise_ your code by splitting it up into several different files.

### 4.1 Reducing the Size of the Routes File

Your first step should be to remove as much code as possible from your main routes file. The file should handle the http requests and send back the response but nothing else. let's look at an example.

books/ example

1. CommonJS modules
2. Handling callbacks in modules
