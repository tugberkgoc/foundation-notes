
# JavaScript

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

## 1 NodeJS

Traditionally JavaScript ran in the web browser and was used to carry out tasks such as animation and form validation. Recently however the Chrome JavaScript interpreter (called V8) has been modified to run on the server which means we can use JavaScript as a replacement for the older server-side languages such as PHP.

There are a number of benefits over other web scripting languages:

The first, and most obvious answer, is that, as a web developer, you are going to have to learn JavaScript anyway because its the only language that will run natively in a web browser so why not use the same language for both client and server?

The second benefit, and one we will return to in later chapters, is that, unlike other scripting languages which create a new process for each connected user, NodeJS runs a single process shared between all users. Since processes are expensive in computing resources it means that a NodeJS deployment is far more scalable. In chapter 3 we will learn how it handles concurrency through the use of threads.

The downside of only having a single process is that the script can only handle thing at a time. To write efficient scripts it is therefore important to avoid waiting for jobs to complete and the language makes use of concepts such as asynchronous _callbacks_ to improve efficiency. We will be covering this important topic later in the worksheet.

### 1.1 Packages

One of the most valuable features of NodeJS is its package manager which allows you to install additional functionality in the form of packages. There are thousands of these to choose from, fully documented on the [Node Package Manager website](https://www.npmjs.com). Later on you will be shown how you can publish your own packages.

Packages can be installed either locally or globally.

1. Local packages are installed in a `node_modules/` directory within the directory containing the NodeJS scripts. This is the way we install most of the modules. These are only available within that directory.
2. Global packages on the other hand are installed system-wide and can be accessed by all the scripts. Normally these need to be installed using root privileges. We will be using global packages in a later chapter. We won't be installing many scripts in this way.

We install packages using the `npm install` command. Modules can be deleted using `npm uninstall` and you can see a list of the modules you have installed in the current directory using `npm ls`.

In this first script we will be using a node package called [readline-sync](https://www.npmjs.com/package/readline-sync) to capture user input. The documentation for all published packages can be found on the NPMJS website so open this page and search for the documentation for readline-sync.

1. Use the terminal to navigate to the `exercises/04_javascript/` directory (each lab sheets has a corresponding directory under the `exercises/` directory).
2. Open the `todo.js` script and note the use of the `require()` function to load the module.
3. Install the module using `npm install readline-sync`
4. Run the `todo.js` script using `node todo`

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

Now uninstall this package before trying to run our script. First we check the package is currently installed then, after running the `remove` subcommand we check that the package has been removed:

```shell
$ npm ls
  /04_javascript
  └── readline-sync@1.4.9
$ npm uninstall readline-sync
  removed 1 package in 1.172s
  found 0 vulnerabilities
$ npm ls
  /04_javascript
  └── (empty)
$ node todo
  Error: Cannot find module 'readline-sync'
```

Notice that we now get an error because the script needs the `readline-sync` package to run.

## 2 Variables and Scope

If you have ever worked with JavaScript you will likely be used to declaring variables with the `var` keyword. This creates a _hoisted function-scoped_ variable which has several issues:

- The variable is _function-scoped_ meaning that it is only visible inside the enclosing _function_. This means that if you want to hide this from the rest of your code (considered good practice) you need to keep it inside a function which is tricky to implement.
- The variable is also _hoisted_ which means that it can be accessed before the line on which it is declared! Effectively all variable declarations are moved to the top of the function block. This can have some nasty side effects.

Until the release of ECMA6, programmers in JavaScript have had to work with these issues but the release of ECMA6 provided two more options and the use of `var` is now deprecated and should no longer be used. To stop us using "bad" JavaScript, ECMA5 introduced a feature called _Strict Mode_.

Notice the first line contains a **Directive**. This is a feature from ECMA5 telling the JavaScript runtime to run the script in [strict mode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Strict_mode).

```javascript
'use strict'
```

This:

- Prevents the declaration of global variables.
- Exceptions are thrown rather than the script fail silently.
- Prevents duplicate property and parameter names (more on this later).

### 2.1 Data Types

JavaScript is a _loosely typed_ language which means you don't declare a data type, it will be automatically determined when a value is assigned. This is sometime referred to as _duck typing_. There are six primitive data types that you should be familiar with, these are:

- `Number`: This is used to represent both floating point and integer values.
- `String`: This is used to represent textual data and consists of a set of 16 bit elements with each element occupying a position referenced by an index, with the first character at index 0.
- `Boolean`: This represents a boolean state and can have only two possible values, `true` or `false`.
- `Null`: This represents the intentional absence of a value. It can contain only one value, `null`.
- `Undefined`: This represents a variable that has not been assigned a value.
- `Symbol`: This is a token representing a unique ID and are created using the `symbol()` function. They are new in ECMA6.

### 2.2 Block-Level Variables

Now we can declare _block-level_ variables using the [let](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let) keyword. These behave much like variables in other languages such as Python or Java in that they are only visible in the block they are declared in (such as a loop or branch).

### 2.3 Block-Level Constants

Until ECMA6, you could not declare _immutable variables_ (otherwise known as constants). ECMA introduced the [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) keyword that can be used to declare block-level constants.

### 2.4 Test Your Understanding

//TODO: needs exercise on JS data types.

Open the `hoisting.js` file and run it. As you complete each of the tasks make sure you run the code to understand what is happening:

1. Notice that we try to print the contents of the variable `name` before it is defined using the `var` keyword. Try running the script, what happens?
    1. The first time we print the variable it prints `undefined`, (so it appears that the variable has already been defined).
    2. Then we declare the variable.
    3. Finally the assigned value is printed out.
2. Now substitute the `let` keyword to declare the variable and run the script again.
    1. Notice that we now get an error showing the variable has not been defined (the variable is no longer hoisted).
    2. Delete the first `console.log()` statement to fix this.
3. Now define the `name` variable using the `const` keyword and run the script again.
    1. Notice we get an error `TypeError: Assignment to constant variable` because we declared `name` as a constant (it can't be modified).

## 3 Conditionals and Loops

Javascript supports a range of branching and looping constructs. They all follow a similar syntax to Java and C++.

### 3.1 Conditionals

JavaScript includes the standard set of conditionals (if, if...else and switch) and the syntax is similar to other modern programming languages. The `todo.js` script makes use of a number of `if` statements to identify which option the user has entered, for example:

```javascript
if (input.indexOf('list') === 0) {
  // the user has chosen the 'list' command.
}
```

Later in this chapter you will be required to implement a `switch` conditional. These share the same syntax as most modern languages and require a `break` command to exit and take an optional `default` clause.

```javascript
const name = String(readline.question('your name: ')).trim()
switch(name) {
  case 'John':
    console.log('your name is John')
    break
  case 'Jane':
    console.log('your name is Jane')
    break
  default:
    console.log('unknown name')
}
```

### 3.2 Loops

Javascript also supports a wide number of loop constructs:

- for
- while...do
- do while

In the `todo.js` script you can see the run-loop has been implemented using a do...while loop.

```javascript
do {
  // this is the run loop
} while (input !== 'exit')
```

It also uses a traditional for loop with loop variable using a syntax similar to C++ and Java. It uses the Array `length` property to iterate through it.

```javascript
for (let i=0; i< items.length; i++) {
  /* Here we reference the array index. */
  console.log(`${i}. ${items[i]}`)
}
```

### 3.3 Test Your Understanding

//TODO: need an exercise covering loops and branching...

## 4 Strings

In common with most other programming languages, JavaScript supports strings.

### 4.1 Strings as Objects

In JavaScript, all strings are objects and have a number of useful methods. In the `todo.js` example there is a line:

```javascript
const input = String(readline.question('enter command: ')).trim()
```

1. The `String()` function takes the expression entered by the user and turns it into a `String object`
2. we remove any whitespace from the beginning and end of the user-entered string by calling the `trim()` method which is part of the String object.

Later in the script we use another method `indexOf()` which returns the index of the first instance of the string parameter. This is used in an `if` statement to see what is at the start of the string.

```javascript
if (input.indexOf('add ') === 0) {
  // the string starts with 'add '
}
```

Notice the use of `===` rather then the standard `==` [equality operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Equality_comparisons_and_sameness). JavaScript supports both but they work in slightly different ways:

- `===` is used for **Strict Equality Comparison** where the result is only `true` if both the value and data types match. This is the preferred choice in **all** situations.
- `==` is used for **Abstract Equality Comparison** and works by automatically converting both values to a common type. This can lead to obscure bugs and so should be avoided.

The script uses a second `if` statement locate the index of the first space in a string to allow it to be split into two. The `substring()` method takes a parameter and returns the string after the supplied index. We need to use `trim()` to remove the space from the start.

```javascript
const space = input.indexOf(' ')
const item = input.substring(space).trim()
```

It's worth taking a few moments to learn about some of the useful [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) methods.

### 4.2 String Concatenation

There are two ways to concatenate (join) strings. Prior to ECMA6 the `+` operator was used to join string literals and string variables.

```javascript
const name = 'John Doe'
console.log('my name is '+ name)
```

ECMA6 introduces the concept of [template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals) which are string literals allowing embedded expressions. The string literal needs to be encased in backticks rather than quotes and the variables enclosed in `${}`. The previous example would look line this.

```javascript
const name = 'John Doe'
console.log(`my name is ${name}`)
```

By using _template literals_ your strings become much easier to read and so you should get into the habit of always using these.

### 4.3 Test Your Understanding

//TODO: need an exercise covering string functions and concatenation.

## 5 Arrays

Our `todo.js` script declares an array near the start to hold the items in our todo list. Notice that the array is declared as _immutable_ using the `const` keyword.

```javascript
const items = []
```

Arrays are _objects_ and have a number of built-in methods. Later in the script we use the built-in `push()` method to add an element to the end of the array. You should take a moment to look through the list of built-in [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) methods and familiarise yourself with them.

```javascript
items.push(item)
```

### 5.1 Test Your Knowledge

Now you are familiar with the basics of the ECMA6 language its time to put this to the test. Make sure you successfully complete all six tasks before continuing to the next section.

1. locate the `input` variable declaration (just inside the `do` loop)
    - define it as a block-scoped variable by replacing the `var` with `let`, what effect does this have? Can you explain why this is the case?
    - modify the script so that it still works (keep the `let` variable declaration). Hint: think about the variable _scope_, you will need to move the variable declaration.
    - substitute a constant by substituting `const` for `let`, what effect does this have?
2. the array at the top of the script is defined using `var`. What happens if you make this immutable (use `const`)?
3. Items are added to the array using its `push()` method.
    - substute the [unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) method. How does this change the script?
4. modify the code to prevent duplicate items being added. You will need to use the [`Array.indexOf()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method.
5. create a **remove** option so an item such as *cheese* can be removed using the syntax `remove cheese`. You may need to use the [`Array.splice()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) method.
6. The current version is case sensitive. Modify the code so that items are converted to lowercase before being added or searched for. You will need to use the [`String.toLowerCase()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) method.
7. The code currently uses a `for` loop to print out the contents of the array:
    1. Replace this with the [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) statement.
    2. Replace this with the [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement. What are its limitations?
    3. Replace this with the [`Array.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method.

## 6 Errors and Exceptions

When JavaScript executes code errors and exceptions may occur. These may be due to incorrect user input or a broken network connection for example. JavaScript includes a rich set of tools for handling these, based on the [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object.

1. Errors are serious problems that normally mean the application will terminate
2. Exceptions on the other hand are problems that can be handled by the program logic and thus prevent the application from terminating. In this task we will be focussing on _exception handling_.

No matter how good we are at programming, our scripts will contain errors. In JavaScript when an unrecoverable error occurs in your code it throws an **Exception**. If this is not caught and handled by your script it will terminate the execution of the script and print the error to the console. Obviously this is a bad outcome and to prevent it we can _catch_ the error and handle it gracefully without causing the program to crash.

Open the `contact.js` script and study it as you cover the following sections.

To help catch any errors, JavaScript uses the `try-catch-finally` statement. The syntax is very similar to other modern language and looks like this:

```javascript
try {
  // this line of code might throw an error
} catch(err) {
  // if an error occurs the execution jumps to this block
  // if no error occurs the block is ignored
} finally {
  // this line runs whether or not an error was thrown
  // this block is optional
}
```

1. All code that could throw an exception _must_ be in a `try{}` block.
2. If an exception is _thrown_ the execution moves to the `catch{}` block.
    - the error object thrown will be passed as the parameter.

When an error gets thrown it passes an Error object which contains three properties:

- the name of the error
- the message passed
- the stack trace.
    - the _stack trace_ is a list of the method calls that the application was in the middle of when an Exception was thrown and can help identify some of the more insidious errors. You should learn to read and understand what information it contains.

### 6.1 Test Your Understanding

//TODO: exercise using errors and exceptions.
