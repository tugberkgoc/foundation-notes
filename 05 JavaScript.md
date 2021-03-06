
# JavaScript

Before you start you need to pull any _upstream changes_. Detailed instructions can be found in the **Setup** lab.

In this lab you will be exploring the JavaScript programming language. This will not cover programming fundamentals since you can already program in Python and/or C++ but will instead focus on the features of the language that differ from other languages you may be comfortable with.

## 1 Functions

In JavaScript, as in most other languages, code can be divided in to modular blocks called functions. Once defined, these can be called from other code. Data can be passed in the form of parameters and functions can return data back to the calling code.

Open the `maths.js` file. Notice that this contains several functions. Each is called directly under its definition.

### 1.1 Function Declarations

Lets start with a simple example.

```javascript
function largestNumber(a, b) {
	if (a > b) return a
	if (b > a) return b
	return null
}

const biggest = largestNumber(5, 8)
```

1. The function is declared using the `function` keyword and the function is given a name which must be a valid variable name.
    - If the name comprises more than one word these should be written using camel casing as shown above. This is known as a **Function Declaration**
2. The function above takes two parameters, `a` and `b`.
    - These are variables with local scope (they can't be accessed outside the function)
    - When the function is called, you need to pass two **values** which get assigned to the two parameters.
    - If you pass too many values the extra ones get _ignored_.
    - If you don't pass enough values the remainder are assigned a value of [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).
      >`undefined` is a [`primitive`](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), which is data that is not an object and has no methods.
3. The function returns a value.
    - If the numbers are not the same it returns the largest.
    - If they are the same, it returns [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### 1.1.1 Test Your Understanding

Start by running the `maths.js` script and map the output it generates against the `console.log` statements in the script.

1. Create a new function called `multiply()` that takes two parameters, `a` and `b` and returns the _product_ of the two.
	- what happens if you call it with only a single parameter?
2. Open the `contact.js` script, implement the `validateEmail()` function and thoroughly test it, you should avoid using regular expressions at this stage:
	1. Check that the string is at least 5 character long
	2. Check that there is a `@` character and that it is not at the start of the string (HINT: use the [`lastIndexOf`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf) String prototype method.
	3. Check that there are no spaces (`' '`)
	4. Check that there are no double dots (`'..'`)
	5. Check that there is a period (.) character after the `@` character but before the end of the string.

#### 1.1.2 Function Parameters

In the JavaScript language although we define a function with a set of specified _parameters_, when we call the function we don't need to pass these arguments:

We can choose to pass fewer arguments than are specified in the function parameters. Any parameters that don't have a matching argument are set to `undefined`. For example, in the following code num has a value of [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined), so it can't be squared.

```javascript
function sqr(num) {
	return num * num
}
sql()  // returns NaN (not a number)
```

This can cause issues in your code so to prevent this we provide [Default Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters). If an arguement is missing when a function is called this specifies a default value to use. For example consider this version of the function:

```javascript
function sqr(num = null) {
	return num * num
}
sqr()  // returns 0
```

In JavaScript:

- A value of `undefined` means a value has not been assigned to a variable.
- A value of `null` is a value assigned to a variable and means _no value_.

It is also possible to pass in more arguements than there are parameters in the function declaration. The following is quite valid:

```javascript
function add(num1, num2) {
	return num1 + num2
}
console.log(add(4, 2, 1))  // returns 6
```

As you can see, if there are too many arguments, the extra ones are ignored, however, JavaScript provides a mechanism to access all the arguments passed to a function regardless of whether they match the parameter list by using the _array-like_ `arguments` object, for example:

```javascript
function add() {
	let total = 0
	for(const arg of arguments) total += arg
	return total
}
console.log(add(4, 2, 1))  // returns 7
```

Using _hidden_ or _magic_ variables that magically come into existence can make your code hard to understand so ECMA6 introduced [Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters), parameters that can hold any arguments that don't match the parameters in the function declaration. Take the following code:

```javascript
function add(num1, num2, ...others) {
	let total = num1 + num2
	for(const arg of others) total += arg
	return total
}
console.log(add(4, 2, 1))  // returns 7
```

This demonstrates how the rest parameter _mops up_ any surplus arguments and could be written as:

```javascript
function add(...numbers) {
	let total = 0
	for(const arg of numbers) total += arg
	return total
}
console.log(add(4, 2, 1))  // returns 7
```

#### 1.1.3 Test Your Understanding

1. In the `maths.js` file, create a function called `divideThis()` that takes two arguments, a number to be divided, `dividend` and the number to divide by, `divisor`. The function should return the _quotient_.
2. What happens if you don't pass a parameter for the `divisor` parameter? Can you fix this by supplying a suitable _default parameter_?
3. Call the `multiply()` function from the previous task omitting the second parameter. Can you modify the function so it uses a default parameter to multiply by 1 if the second parameter is missing.
    - What happens if you don't supply _any_ parameters?
    - Add a second default parameter to prevent this.
4. Create a new function called `average()` that takes one or more numerical parameters to return the average of these:
    - Write this to make use of the `arguments` construct.
    - Rewrite this to use an ECMA6 rest parameter.

### 1.2 Function Expressions

Functions are a data type in JavaScript (they are objects but more on that later). As such they can be stored in variables for later execution. Prior to ECMA6 they were declared using the `function` keyword like this:

```javascript
const remainder = function(dividend, divisor) {
	const quotient = Math.floor(dividend / divisor)
	return dividend - quotient
}
```

This is known as storing a _function expression_ in a variable (or just a _Function Expression_ for short).

To execute the function you simply reference the variable and append `()`.

```javascript
const rem = remainder(8, 5)
```

ECMA6 introduced a better way to handle function expressions, called an [**`arrow function expression`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). This has a much shorter (and cleaner) syntax. Here is the same function expression written using this new syntax, make a careful note of the differences.

```javascript
const remainder2 = (dividend, divisor) => {
	const quotient = Math.floor(dividend / divisor)
	return dividend - quotient
}
```

The _arrow function expression_ has a number of important features:

1. It does not have its own function scope which means it does not bind its own `this` object (made clearer later).
2. In a concise body (one line) it has an implicit return and you don't need to use block braces. This results in very concise code, see the example below).
3. If there is only a single parameter the parameter brackets can be omitted.

Here is an example that should make points 2 and 3 clearer.

```javascript
const sqr = num => num * num
```

### 1.2.1 Test Your Understanding

1. Refactor the `remainder2` function expression to take advantage of the implicit return (you will need to reduce it to a single line of code).
    - Compare this to the original version: which is more _readable_?
2.  Write an _arrow function expression_ stored in a constant called `squareRoot` which calculates and returns the square root of the supplied number. You will need to use the `sqrt()` method which is part of the `Math` object.
3. Create a function expression that takes two string parameters and returns the longest string and assign this to a constant called `longest. check this works correctly.
	- Modify the function expression so that it can handle any number of string parameters (use a _rest parameter_). (hint: you will need to use a [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement to loop through the strings. How does this differ from a [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) statement?)
	- Make sure there are no errors thrown and `null` is returned when the function is called without any arguments
	- Use a [`ternary operator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) instead of the `if` statement in the loop.
	- Finally use the [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) method to replace the `for...of` loop to reduce the function to a single line.

## 2 Callbacks

Since JavaScript supports [_first class functions_](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function), we can use a function in any place where we could use a literal, object or variable. Open the `currency.js` script and look at line 22. As you can see the `fs` object has a key called `readFile` that stores a function (we have already covered this). This takes two parameters:

1. A string representing the path of the file to be read.
2. A function that will be called once the file has been read. This was defined earlier in the script and takes 2 parameters.

```javascript
const printRates = (err, data) => {
	if (err) throw err
	const parsedData = JSON.parse(data) // this converts the formatted string into a javascript object
	for (const country of parsedData) {
		if (country.code === symbol) {
			console.log(`For each GBP you will get ${country.rate} ${symbol} today.`)
			return
		}
	}
}
fs.readFile(filePath, printRates)
```

This is a common construct used in JavaScript/NodeJS. The second function parameter is known as a **callback**.

NodeJS is a single-threaded event loop that processes queued events. This means that if you were to execute a long-running task within a single thread then the process would block. To solve this problem, NodeJS  relies on callbacks, which are functions that run after a long-running process has finished. Instead of waiting for the task to finish, the event loop moves on to the next piece of code. When the long-running task has finished, the callback is added to the event loop and run.

Because callbacks are such a fundamental part of NodeJS you need to spend time to make sure you fully understand how they work.

### 2.1 Using Anonymous Functions in Callbacks

Although this code works, you will rarely see callbacks written in this manner. Creating a function literal is a bit clunky and we can clean up the code by simply passing an anonymous function.

```javascript
fs.readFile(filePath, (err, data) => {
	if (err) throw err
	const parsedData = JSON.parse(data) // this converts the formatted string into a javascript object
	for (const country of parsedData) {
		if (country.code === symbol) {
			console.log(`For each GBP you will get ${country.rate} ${symbol} today.`)
			return
		}
	}
})
```

Take a few moments to make sure you fully understand the syntax, you will be seeing a lot of this over the next few weeks.

### 2.1.1 Test Your Understanding

You are now going to apply you knowledge of JavaScript callbacks by connecting to the [Open Weather API](https://openweathermap.org/api). Start by opening the `weather.js` file:

1. Read through the code to make sure you understand how it works.
	- An API key was already registered and is stored in the `apiKey` variable
	- Run the script and check the output, can you explain the first two lines of output, why are the data types as shown?
	- Can you make sense of the other data?
2. Use the `Open Weather API` to retrieve and display the [hourly forecast](https://openweathermap.org/api/one-call-api).
	- Look at the format of the API calls, and substitute the `{lat}`, `{lon}` and `{API key}` placeholders
		>`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}`
	- What's the easiest place to put the new request? Why? Why is this problematic?

## 2.2 Defining Functions with Callbacks

In the previous section you learned how to call pre-defined functions with callbacks. Now you will learn how to write your own functions that include callbacks. This is important since NodeJS has a single-threaded model and any activity that may take time to complete should never be in the main thread. By creating a function with a callback you can push the task onto its own thread and free up the main event thread.

Start by opening the `files.js` script and study it carefully:

1. Notice that we are reading and writing to files in the main thread! This would normally block the thread, slowing down the program execution.
2. Also notice that the reading and writing takes place in a function `savetext()` with a callback defined as its second parameter.
3. At the end of the `saveText()` function we execute the callback.
4. We can then call our `saveText()` function, passing an anonymous callback function as the second parameter, this is executed within the `saveText()` function.
5. The convention when defining functions that take a callback function is to define the error as the first parameter.

## 3 Objects

Lets start by creating and manipulating objects using **object literals**. Open the `employee.js` file, read through it and see if you can work out what it does. Now run it to see if you were correct.

### 3.1 Creating Object Literals

The simplest way to create new objects is by creating an _object literal_ which is defining an object and storing it in a variable in a similar way to how we created function literals earlier in the lab. You should open the `employee.js` file which contains the code.

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	startYear: 2010
}
```

As you can see from the simple example above, the data is stored in name-value pairs, referred to as **Properties**. This example is defining an object with **3** properties.

The _name_ part of each property is a JavaScript string which may be enclosed in single quotes. These quotes are optional if the _property name_ is a valid _JavaScript variable_ but they are required if this is not the case.

In the example above, `firstName` is a valid JavaScript variable but `last name` is not because it contains a space which is not allowed in variable names.

It is also possible to create an empty object (we can add properties later). This is done by assigning empty curly braces.

```javascript
const emptyObject = {}
```

Here are some valid _property names_. Notice that both `age` and `'age'` are valid.

```
age
'first name'
'age'
```

The _property names_ below are **not** valid because they are not a valid JavaScript variable names.

```
first name
firstName!
first-name
```

#### 3.1.1 Test Your Understanding

1. Add a property called `gender` and assign a suitable String value.
2. Add a new property called `date of birth` that stores the year the person was born and assign a suitable value.

### 3.2 Retrieving Object Properties

Whilst it is possible (and useful) to log an entire object to the console, normally we would want to retrieve the values of specific properties, this is known as **destructuring** an object.

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}

console.log(employee)
const firstName = employee.firstName
const lastName = employee['last name']
const grade = employee.grade
```

Passing the object name to `console.log()` will print out the string representation of the object. To retrieve a specific property value there are two options. If the name is a _legal JS variable name_ the dot `.` notation can be used. This is used to extract the `firstName` property in the example above.

If the name is not a valid JavaScript variable name, we need to turn it into a string by using quotes `''` and enclose it in square brackets `[]`. This is used for the `last name` property.

The `grade` variable will be `undefined` because `employee.grade` does not exist. If you want to avoid this and assign a default value if the property is missing you can use the **OR** operator `||`.

```javascript
const grade = employee.grade || 'A'
```

This will retrieve the value of the grade property if defined and store it in the `const` variable. If this property is missing the `const` variable will contain the string `'A'`.

#### 3.2.1 Test Your Understanding

1. Create a new object called `university` which should contain three properties, `year1`, `year2` and `year3`. Each of these properties should store an object whos keys are the module codes and values the titles of the modules.
2. Create a variable called `study01` containing the `year1` object.
3. Use the `for...in` statement to iterate over this `study01` object printing out all of the _module codes_ and the _module names_.

### 3.3 Context

Every JavaScript object has a reference to its current execution **context**. This refers to how the function was called. To reference the current context we use the `this` object.

You should start by opening the `counties.js` file and studying it carefully. This simple script demonstrates some of the key features of working with context.

1. Lines 5-7 define a simple function called `print()` which prints the context object `this`.
2. Lines 9-11 define two objects:
    1. Each contains two properties, a `name` string and the `print()` function.
    2. Since we are storing the `print()` function in a property with the same name we can use the ES6 Object Shorthand syntax. The second object uses this.
3. Line 13 calls the `print()` function from the global context. This prints an empty object.
4. Lines 15 and 16 call the `print()` function from inside each of the objects. This demonstrates that the `name` properties are part of the object context.

If you look at the console output you will notice that, when we access `this` from _inside_ an object, it is bound to the object from where it was called.

Because we are operating in [_strict mode_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), when we try to access `this` in the global context it returns `undefined`.

### 3.4 JSON Data

JSON (JavaScript Object Notation) is a standard text-based format to represent structured data. This is very useful as it means we can take any JavaScript object and convert it into a text string. This can then be saved to disk or posted to a web server, etc. It also means that you can take a JSON-formatted text string and convert it into a complex JavaScript object!

#### 3.4.1 Parsing JSON Strings into Objects

It is trivial to convert a JSON string into an object using the `JSON.parse()` function. Study the following code carefully:

```javascript
const jsonstring = '{ "firstName": "Colin", "last name": "Stephen", "department": "Computing"}'
const employee = JSON.parse(jsonstring)
```

Notice that in a JSON string all the properties and values _must_ be enclosed in double-quotes. The constant `jsonstring` is a **String** but `employee` is a standard JavaScript **Object**.

#### 3.4.2 Converting Objects into Strings

In the same way that we can convert a JSON string into a JavaScript object we can also do the reverse.

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}
const jsonstring = JSON.stringify(employee)
console.log(jsonstring)
// { "firstName": "Colin", "last name": "Stephen", "department": "Computing"}
```

In this example `jsonstring` is a **String**. If we print out this string we will see that it contains a single line of text which can sometimes be hard to understand. If we want the string to be more readable we can pass another parameter.

```javascript
const jsonstring = JSON.stringify(employee, null, 2)
/*
{
	"firstName": "Colin",
	"last name": "Stephen",
	"department": "Computing"
}
*?
```

This inserts newline and space characters to make the string more readable. The third parameter defines the level of indent (in spaces).

#### 3.4.3 Test Your Understanding

Lets apply our knowledge of callbacks to implement a simple quotes tool.

1. Create a json-formatted text file called `quotes.json` containing 10 quotes, you can find lots of these on websites such as [brainyquotes](https://www.brainyquote.com/topics/inspirational). Each quote should include the quote and the author.
2. Create a new script called `quotes.js` and use the [`fs.readfile()`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) function to read the contents of the file and display it in the terminal.
3. The contents of the file is a `UTF-8` string, use `JSON.parse()` to convert this into a JavaScript object (array) and print this to the terminal instead.
4. Create a loop to iterate through the array, printing the contents of each index.
5. Modify the code so that it only prints the quote string (not the entire object).
6. Convert the `university` object from the previous exercise into a JSON string and save it to the filesystem as `university.json`.

### 3.5 ECMA6 Object Destructuring

There are situations where we want to retrieve multiple object properties and store them in different variables, for example:

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}
const first = employee.firstName
const last = employee['last name']
console.log(`${first} ${last}`)
```

In ECMA6 it is possible to extract multiple pieces of data into separate variables by destructuring using a [Desctructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring). This is syntactically similar to creating object literals (see the example below).

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}

const {firstName: first, 'last name': last, department: dept} = employee
console.log(first) // prints 'Colin'
console.log(dept) // prints 'Computing'
```

#### 3.5.1 Test Your Understanding

1. Take the `university` object inside `employee.js` that you created in an earlier exercise and use a single line destructuring assignment to create three variables, `year1`, `year2` and `year3`.

### 3.6 Getters and Setters

Most object properties are simple values and you can simply assign a value. Sometimes however properties need to be calculated. One solution is to store a function as one of the properties, however, we would need to call a function to retrieve the value:

```javascript
const employee = {
    firstName: 'Colin',
	'last name': 'Stephen',
	getName: function() {
		return `${this.firstName} ${this["last name"]}`
	}
}

const name = employee.getName()
```

Whilst this works fine, it looks a little clunky. Thankfully in the newer versions of JavaScript you can use a [**`getter`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) which makes the code far more intuitive.

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	get name() {
		return `${this.firstName} ${this['last name']}`
	}
}

const name = employee.name
```

In the same manner, some properties when set may need to change other properties. Here is a solution using a stored function.

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	setName: function(fullname) {
		const words = fullname.toString().split(' ')
		this.firstName = words[0] || ''
		this['last name'] = words[1] || ''
	}
}

employee.setName('Micky Mouse')
```

By using a [**`setter`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set), it behaves just like any other property.

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	set name(fullname) {
		const words = fullname.toString().split(' ')
		this.firstName = words[0] || ''
		this['last name'] = words[1] || ''
	}
}

employee.name = 'Micky Mouse'
```

#### 3.6.1 Test Your Understanding

1. In `employee.js`, print the person's details in an easy to understand sentence.
	- Notice how `JSON.stringify` also doesn't omit the getter from the string representation of the object, but displays its current output after the property name:
		```json
		{
			"firstName": "Micky",
			"last name": "Mouse",
			"startYear": 2010,
			"gender": "male",
			"date of birth": "1980-01-01",
			"details": "firstName: Micky, lastName: Mouse, startYear: 2010, gender: male, DoB: 1980-01-01"
		}
		```
2. Add a getter to return the number of years the employee has been working for the company, you will need to create a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object containing the current time, and then its [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) method to get the year value.
3. Create a proper setter that updates the employee's `firstName` and `last name` properties the same way as the one provided does

### 3.7 Modifying Objects

Once an object has been created it can be modified in several ways.

1. More object values can be added
2. Object names can be deleted
3. The values can be changed for existing names.

Once an object has been created, additional properties cane be added by setting values by assignment.

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}

employee.grade = 4
employee['currently employed'] = true
employee.department = 'Computer Science'
```

This sets a new value if the name does not already exist. Otherwise, it updates the existing value. Notice that the syntax depends on whether the property name is a valid JavaScript object and matches the syntax used to retrieve a property.

Properties can be removed from an object literal using the `delete` operator. This removes the entire property (name and value).

```javascript
const employee = {
	firstName: 'Colin',
	'last name': 'Stephen',
	'department': 'Computing'
}

delete employee.department
```

### 3.8 Undefined Values

Undefined Objects
- If you try to retrieve a non-existent object, JS throws a `ReferenceError`
	- Same thing happens when you try to access "one of its properties" (quotes because the object doesn't exist)
- If you try to retrieve one of `undefined`'s properties, JS throws a `TypeError` 
- If you retrieve an existing object's non-existent property, it returns `undefined`
	- If you try to retrieve the `undefined` property's property, JS throws a `TypeError` as with any other `undefined`

```javascript
nonExistingObject // throws ReferenceError
nonExistentObject.whatever // throws ReferenceError
undefined.whatever // throws TypeError
const existingObject = {}
existingObject.nonExistentProperty // returns undefined
existingObject.nonExistentProperty.whatever // throws TypeError
```

To see what a `TypeError` looks like, try uncommenting lines marked with `"TypeError:"` in the `employee.js` file. So how can we avoid this?

The [**`Logical AND`** `(&&)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) operator can be used to guard against this problem.
- As this operator doesn't evaluate the second value if the first one is [`falsy`](https://developer.mozilla.org/en-US/docs/Glossary/falsy), we can be sure it won't try to retrieve a property of `undefined`.

```javascript
const postCode = employee.address && employee.address.postCode
console.log(postCode) // returns undefined
```
- `postCode` gets the value of `employee.address` if it's [`falsy`](https://developer.mozilla.org/en-US/docs/Glossary/falsy) (e.g. `undefined` (as it's in this case), `false`, `0`, or `''` (empty string))
- but would get the value of `employee.address.postCode` if `employee.address` is [`truthy`](https://developer.mozilla.org/en-US/docs/Glossary/truthy) (e.g. `true`, `1`, `'a'` (non-empty string), or an existing object (even empty object))

General examples:
```javascript
'' && 'foo' // returns ''
false && 'foo' // returns false
{} && 'foo' // returns 'foo'
1 && 0 // returns 0
```

#### 3.8.1 Test Your Understanding

1. Modify the code to handle bad data:
    1. Remove the startYear property.
    2. Set the startYear property to a String.

### 3.9 Object Prototypes

All JavaScript objects (such as `String`, `Number`, `Array`, etc.) inherit properties and methods from a [**`prototype`**](https://developer.mozilla.org/en-US/docs/Glossary/Prototype-based_programming). This also applies to any new objects you create. Since JavaScript does not support _traditional_ classes, this becomes the way to add new functionality. Let's look at a simple example.

The `String` object does not have a way to convert a string into an array of characters so we will add this. After it is added we can see that _all strings_ have this new behaviour.

```javascript
String.prototype.toArray = function() {
	return this.split('')
}

const nameArray = 'John Doe'.toArray()
console.log(nameArray)
```

There are a couple of important concepts here.

1. Notice that the function is _not_ defined using the arrow syntax `=>`, this is because we need the function to have its own _context_, this does not happen with arrow functions.
2. Inside the function we manipulate the `this` object which represents the value of the object.
    1. Replace the `function() {}` construct with an arrow function. What happens when you run the script?

#### 3.9.1 Test Your Understanding

1. Extend the `Array` object by adding a function `toStr()` that takes an array and turns it into a string. You will need to use the [`Array.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) function.

## 4 Object Constructors

As you have seen from the previous section, each object (String, Number, etc) has its own _prototype_, but what about the custom objects you created? It turns out that these also have a prototype, _Object_. Any functionality you add to this will get added to _all the objects in your application!_. To get around this problem NodeJS has the `new` keyword. When this is used, we can isolate any changes to the targeted object.

### 4.1 Object Constructor Functions

Until ECMA6, there was a way to achieve this by using a **constructor function**. While now this isn't considered the optimal way to achieve our goal, there are so many examples of this approach, that it's important you understand both the syntax and how it works. When we use this approach, using the `new` keyword triggers four steps:

1. We create an empty object.
2. We set its prototype property to the constructor function's prototype function.
3. We bind its `this` object to the new object.
4. We then return the new object.

Lets see an example:

```javascript
function Person(name, startYear) {
	const currentYear = 2019
	this.name = name
	this.startYear = startYear || currentYear
	this.years = currentYear - this.startYear
}

const colin = new Person('colin', 2012)
console.log(colin)
// Person { name: 'colin', startYear: 2012, years: 7 }

const nigel = new Person('nigel')
console.log(nigel)
// Person { name: 'nigel', startYear: 2019, years: 0 }
```

Note that it is a convention that objects that can be used to create objects using the `new` keyword start with a capital letter. Also notice that when we print the object it clearly shows that it is an instance of `Person` and not `Object`.

### 4.2 Extending using Object Constructor Functions

Whilst this syntax is not using traditional classes, one object can _extend_ another. This is best illustrated through the example below where we create another object called `Student`.

```javascript
function Student(name, startYear, course) {
	Person.call(this, name, startYear)
	this.course = course || 'not enrolled'
}

const emily = new Student('emily', 2017, 'architecture')
console.log(emily)
// Student { name: 'emily', startYear: 2017, years: 2, course: 'architecture' }

const anne = new Student('anne')
console.log(anne)
// Student { name: 'anne', startYear: 2019, years: 0, course: 'not enrolled' }
```

### 4.3 ECMA6 Class Syntax

Whilst constructor functions are not particularly elegant they do provide a way to structure your objects efficiently. ECMA6 introduced a cleaner way to work with these using **classes**. Note that despite this looking like a (traditional) OOP language, remember it is really only a different syntax for constructor functions. Let's look at the previous example using the new syntax:

```javascript
class Person {
	constructor(name, startYear) {
		const currentYear = 2019

		this.name = name
		this.startYear = startYear || currentYear
		this.years = currentYear - this.startYear
		return this
	}
}
```

Since this is syntactic sugar for the constructor function we can extend this to create different objects.

```javascript
class Student extends Person {
	constructor(name, startYear, course) {
		super(name, startYear)
		this.subject = course || 'not enrolled'
	}
}
```

Note that we use the `constructor()` function rather than calling the base object.

We can also make use of **getters** and **setters** to retrieve and modify object properties.

```javascript
class Student extends Person {
	constructor(name, startYear, course) {
		super(name, startYear)
		this.subject = course || 'not enrolled'
	}
	get course() {
		return this.subject
	}
	set course(newCourse) {
		this.subject = newCourse
	}
}
```

### 4.4 Static Members

Currently each instance of a prototype function is completely self-contained. What if we need to store data about the prototype function itself? In a traditional OOP language we would use static methods and the new ECMA `class` syntax allows us to do something similar by adding properties to the prototype function itself. We can also define static methods that can be called directly from the prototype function, see the example below.

```javascript
class ECMA6Student extends Person {
	constructor(name, startYear, course) {
		super(name, startYear)
		this.subject = course || 'not enrolled'
		if(ECMA6Student.count === undefined) ECMA6Student.count = 0
		ECMA6Student.count++
	}
	static studentCount() {
		return ECMA6Student.count
	}
}

const ruth = new ECMA6Student('ruth')
console.log(ECMA6Student.count)          // prints '1'
const matt = new ECMA6Student('matt')
console.log(ECMA6Student.studentCount()) // prints '2'
```

Notice that the static variable `count` is public (so the `studentCount()` method is somewhat superfluous in this example!). This highlights one of the limitations of JavaScript, the lack of a simple way to define private attributes (variables and methods). The next section goes into this in more detail and explains some workarounds (hacks) to get around this.

### 4.5 Handling Data Encapsulation

In all of these objects all data is public (you can see the entire object by using `console.log()`). One of the weaknesses of NodeJS (and JavaScript in general) is that there is no clean way to _encapsulate_ data and make it hidden from the outside world. There are a number of techniques to get around this problem:

1. Storing the data in the class [constructor environment](http://speakingjs.com/es5/ch17.html#private_data_constructor_environment).
2. Using a naming convention such as starting all private data with an underscore.
3. Storing data in a [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).
4. Use a property who's key is a [Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol).

You should take time to understand the [pros and cons](https://2ality.com/2016/01/private-data-classes.html) of all four approaches.

### 4.6 Test Your Understanding

In a new file called `vehicles.js`:
1. Create a **constructor function** called `OldVehicle` that includes `make`, `model` and `price` information. Use this to create two vehicles of your choice.
2. Use this to create a second **constructor function** class called `OldPickup` that includes `payload` and `seats` fields and use this to create two pickup objects.
3. Now use the same information to create a class called `NewVehicle` and extend this to create a class called `NewPickup` and use this to create two or more pickup objects.
4. Add a static member to capture the total value of all the pickup sales and print this to the terminal.
