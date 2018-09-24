
# JavaScript

The third skill you will need, after HTML5 and CSS3 is the ability to control the operation of your website by writing scripts using a suitable programming language. There are many languages to choose from such as Python, PHP or Java however in this module you will be using the JavaScript language.

There are a huge range of language features but this worksheet will focus on those that are directly relevent to the assignment. You are encouraged to study the language in more depth. It is assumed you are comfortable with core programming principles using the _Python_ language.

Javascript (more correctly known as ECMAscript) has been around since the mid 1990s and has acquired a bad press due to some of its badly implemented features that can introduce bugs into your code. In the last couple of years it has changed considerably and version 6 often referred to as ECMA6 (the version you will be using) is now considered a flexible, powerful scripting language.

**Warning: most online tutorials have been written using the older flavours of JavaScript. You should not rely on these giving you the correct information.**

We must _avoid using_ this older style and this worksheet will only cover the most up to date implementation of the language.

## NodeJS

Traditionally JavaScript ran in the web browser and was used to carry out tasks such as animation and form validation. Recently however the Chrome JavaScript interpreter (called V8) has been modified to run on the server which means we can use JavaScript as a replacement for the older server-side languages such as PHP.

There are a number of benefits over other web scripting languages:

The first, and most obvious answer, is that, as a web developer, you are going to have to learn JavaScript anyway because its the only language that will run natively in a web browser so why not use the same language for both client and server?

The second benefit, and one we will return to in later chapters, is that, unlike other scripting languages which create a new process for each connected user, NodeJS runs a single process shared between all users. Since processes are expensive in computing resources it means that a NodeJS deployment is far more scalable. In chapter 3 we will learn how it handles concurrency through the use of threads.

The downside of only having a singme process is that the script can only handle thing at a time. To write efficient scripts it is therefore important to avoid waiting for jobs to complete and the language makes use of concepts such as asynchronous _callbacks_ to improve efficiency. We will be covering this important topic later in the worksheet.

## Packages

One of the most valuable features of NodeJS is its package manager which allows you to install additional functionality in the form of packages. There are thousands of these to choose from, fully documented on the [Node Package Manager website](https://www.npmjs.com). Later on you will be shown how you can publish your own packages.

In this first script we will be using a node package called [readline-sync](https://www.npmjs.com/package/readline-sync) to capture user input. The documentation for all published packages can be found on the NPMJS website so open this page and search for the documentation for readline-sync.

1. Use the terminal to navigate to the `exercises/05_javascript/` directory.
2. Install the module using `npm install readline-sync`
3. Run the `todo.js` script using `node todo`

When the script is running you will be prompted to enter a command. Try adding three items and listing them all. Finally typing exit to return to the shell prompt:

```shell
enter command: add bread
adding "bread"
enter command: add butter
adding "butter"
enter command: add cheese
adding "cheese"
list
0. bread
1. butter
3. cheese
exit
```

### Managing Packages

Packages can be installed either locally or globally.

1. Local packages are installed in a `node_modules/` directory within the directory containing the NodeJS scripts. This is the way we install most of the modules. These are only available within that directory.
2. Global packages on the other hand are installed system-wide and can be accessed by all the scripts. Normally these need to be installed using root privileges. We will be using global packages in a later chapter. We won't be installing many scripts in this way.

You have already seen that we can install packages using the `npm install` command. Modules can be deleted using `npm uninstall` and you can see a list of the modules you have installed in the current directory using `npm ls`.
