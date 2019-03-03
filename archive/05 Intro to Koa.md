
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

The Express framework has grown over the years and contains a lot of functionaity that we won't need. Koa has the opposite philosophy. It’s a minimalist framework where all the functionality is aplit into smaller modules that can be imported when needed.
.
Koa is Express 5.0 in spirit; it’s by the same people that created Express, and the authors changed the name to avoid upsetting people because of the backwards incompatible changes (which also happened in the Express 3 to Express 4 transition).

The only issue is that there was a big change from Koa v1 to Koa v2 and the older tutorials are therefore of no use. We will focus on using the latest version of Koa, currently 2.7 at the time of writing. Lets take an in-depth look at a script which should be familiar to you to understand how the web server works.

### 2.1 The Manifest

A correctly-configured NodeJS application includes a special _manifest_ file called `package.json`. You will find one in the `exercises/04_koa/` directory. This contains important _metadata_ about the application. If you open this you will notice it contains a [JSON string](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) which includes a number of [keys](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/):

1. The `name` key contains the name of the application, in this case `koa-intro`.
2. Underneath this you will find the version number and a brief description of the software.
3. The `main` key defined the entry point to the application (the script that should be run).
4. Next are _script aliases_, shortcuts to run different commands. In our example we have a `test` alias that is used to trigger the jest testing tool and a `server` alias to start the server.
5. After the `scripts` key you will notice a `jest` key that contains the configuration options for the [Jest](https://jestjs.io) testing tools.
6. Next we have the author and licence fields.
7. Finally the manifest list the packages needed for the application to run:
    1. The `dependencies` key contains all the packages needed to run the application such as `koa` and its plugins.
    2. The `devDependencies` key lists all the extra packages needed when developing the application but not needed by the app itself such as the testing tools.

To see how the manifest can help us with running an application:

1. Navigate to the `exercises/04_koa/` directory using terminal.
2. Use the `npm install --production` command to install all the packages needed to run the application (no development tools).
3. Use the `npm run server` to trigger the `server` alias.
4. Try using `npm run test` to run the test suite, notice that the `jest` command is no currently installed.
5. Run `npm install` to install the developer tools (it won't' install the production modules because these are already installed).
6. Now you can run the test suite.

### 2.2 The Routing File

Study the `index.js` script in the `exercises/04_koa/` directory.

1. The first line is the _shebang_, it tells the script what application is needed to run it. If the file is _executable_ you can simply call this without using the node command like this: `./index.js` instead of `node index.js`.
2. Lines 3-6 are where we import all the modules we are going to be using.
3. Lines 8-12 are where we create instances of the `koa` and `router` objects and configure the plugins (known as the _middleware_).
4. Next we define any global variables and constants. In this script we store the port number as a constant.
6. The main part of the script defines the _routes_ and we will be covering these in more detail as we progress through the lab.
7. Right at the end we start the server on the defined port and _export_ the _koa object_ `app`. By exporting it we can import the script into our automated test suite (briefly covered in the previous lab).

### 2.2.1 Test Your Understanding

Lets start with a quick refresher:

1. Create a new route called `/test` and create a file called `mytest.html` containing a valid HTML5 web page that displays your name in the `views/` directory. Restart the server and make sure the page displays.
2. Create a new CSS3 stylesheet called `test.css` in the `css/` directory in the `public/` directory. Link it to your new page and change the font face and colour of the text.
3. Find a download a photo of the University, add it to the `images/` directory inside the `public/` directory and make sure you can view this in the browser.

## 3 Routing

Every _request_ sent from the client is handled by a route. The server compares the requested HTTP method and route against the strings passed as the first parameter until it finds a match. If there are no routes that match the specific URL the koa server will repond with a `404 NOT FOUND` response.

Each route consists of a strange-looking block of code. This is making use of a special (but common) programming construct called a _callback_. Since this is very common in JavaScript we will take a good, close look.

### 3.1 Callbacks

The route handling code is your first instruction to the ubiquitous construct called a _callback_. This is at the heart of milti-threaded JavaScript programming and has been around since the language was first created in the 1990s.

When a match is found, the server runs the _callback_ (anonymous function) that has been supplied as the second parameter. This function takes a single `ctx` parameter which is an object that contains all the data from both the request and response (the _context_).

```javascript
app.get('/test', ctx => {
    // code goes here
})
```

### 3.1 Callback Functions