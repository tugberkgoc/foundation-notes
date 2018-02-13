
# Functions and Objects

## 1 Functions

In JavaScript, as in most other languages, code can be divided in to modular blocks called functions. Once defined, these can be called from other code. Data can be passed in the form of parameters and functions can return data back to the calling code.

Open the `maths.js` file. Notice that this contains several functions. Each is called directly under its definition.

### 1.1 Function Syntax

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
    a. If the name comprises more than one word these should be written using camel casing as shown above.
2. The function above takes two parameters, `a` and `b`.
    - These are variables with local scope (they can't ba accessed outside the function)
    - When the function is called, you need to pass two **values** which get assigned to the two parameters.
    - If you pass too many values the extra ones get _ignored_.
    - If you don't pass enough values the remainder are assigned a value of `null`. `Null` is an assignment value (means a value of no value).
3. The function returns a value.
    a. If the numbers are not the same it returns the largest.
    b. If they are the same it returns `null`.

### 1.1.1 The Spread Operator

If the data you want to pass to a function is stored in an `Array` (this is quite common), you could extract each value and assign to the function like this:

```javascript
const nums = [5, 8]
const biggest2 = largestNumber(nums[0], nums[1])
```

Because this is such a common task, there is a shortcut called the **spread operator**. Using this, the same task can be expressed like this.

```javascript
const nums = [5, 8]
const biggest2 = largestNumber(...nums)
```

Notice the syntax of the _spread operator_.

### 1.1.2 The Arguments Object

When a function is declared it has a **signature** which defines the number of parameters it is expecting, for example in the `largestNumber()` function, the signature defines two arguments.

```javascript
function largestNumber(a, b) { // this is the function signature.
  // function body
}
```

What happens if you try to call this with the _wrong_ number of arguments?

- If you supply too few arguments the remaining parameters are assigned a data type and value of `null`.
- If you supply too many arguments, the remaining ones are not assigned to the parameters, so where are they?

Every JavaScript function has an object called `Arguments` which contains all the parameters passed to that function, even ones no assigned to the formal parameters. This provides a mechanism to access arguments that don't get assigned to parameters. Lets take a look at the `add()` function.

```javascript
function add() {
  let total = 0
  console.log(arguments)
  console.log(arguments['1'])
  for(const arg of arguments) {
    total += arg
  }
  return total
}
```

As you can see, the function signature defines no parameters, but when we call it we pass 4 arguments. What happens to these and how can we access them?

```javascript
const addNums = add(1, 2, 3, 4)
```

Inside the function we can access the `arguments` object. The `add()` function shows three ways to do this (we will be covering objects in detail in the next chapter):

- display all the arguments (see below).
- access individual arguments by referencing a key.
- Use a `for...of` loop to iterate through the values.

### 1.1.3 The Rest Parameter

Whilst the `arguments` object provides a mechanism for accessing the function arguments, it returns an Object (the keys are `Strings`). It would be better if

- the arguments could be accessed in an `Array`.
- it ignored arguments already assigned to parameters.

ECMA6 introduced a special parameter called a _rest parameter_ which captures all the arguments that have not been assigned to parameters and stores them in an array. Look at the `add2()` function.

```javascript
function add2(...values) {
  let total = 0
  console.log(values)
  console.log(values[1])
  for (let i=0; i<values.length; i++) {
    total += values[i]
  }
  return total
}
```

The `...values` parameter has a `...` prefix which defines it as a _rest parameter_. In the body of the function it can be seen that this is an `Array` and so each argument has a numerical index. This is the preferred way to handle arguments that are not assigned to parameters.

### 1.1.4 Default Parameters

As explained above, if you don't supply enough arguments for the parameters in the function signature, all the parameters without arguments are assigned a value of `null`. This means you have to add code within the function to check that there is a value assigned to the parameters before you can safely use them. ECMA6 has introduced **default parameters**. These allow you to assign a default value to a parameter if one is not supplied by when the function is called. Lets examine the `divide()` function.

```javascript
function divide(dividend, divisor=1) {
  const quotient = dividend / divisor
  return quotient
}
```

Notice that the divisor has been assigned a value in the function signature. If this parameter is not assigned an argument, it defaults to this value.

### Test Your Understanding

Start by running the `maths.js` script and map the output it generates against the `console.log` statements in the script.

1. Create a new function called `multiply()` that takes two parameters, `a` and `b` and returns the _product_ of the two.
    - what happens if you call it with only a single parameter?
2. Modify the function so it uses a default parameter to multiply by 1 if the second parameter is missing.
    - What happens if you don't supply _any_ parameters?
    - Add a second default parameter to prevent this.
3. Write an _arrow function expression_ stored in a constant called `squareRoot` which calculates and returns the square root of the supplied number. You will need to use the `sqrt()` method which is part of the `Math` object.

Open the `contact.js` script, implement the `validateEmail()` function and thoroughly test it, you should avoid using regular expressions at this stage:

1. Check that the string is at least 5 character long
2. Check that there is a `@` character and that it is not at the start of the string (HINT: use the [indexOf](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) String prototype method.
3. Check that there is a period (.) character after the `@` character but before the end of the string.

### 1.2 Function Expressions

Functions are a data type in JavaScript (they are objects but more on that in the next chapter). As such they can be stored in variables for later execution. Prior to ECMA6 they were declared using the `function` keyword like this:

```javascript
const remainder = function(dividend, divisor) {
  const quotient = Math.floor(dividend / divisor)
  return dividend - quotient
}
```

To execute the function you simply reference the variable and append `()`.

```javascript
const rem = remainder(8, 5)
```

ECMA6 introduced a better way to handle function expressions, called an **arrow function expression**. This has a much shorter (and cleaner) syntax. Here is the same function expression written using this new syntax, make a careful note of the differences.

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

//TODO: add an exercise on function expressions.

### 1.3 Callbacks

Since JavaScript supports _first class functions_, we can use a function in any place where we could use a literal, object or variable. Open the `currency.js` script and look at line 17. As you can see the `request` object has a key called `get` that stores a function (we have already covered this). This takes two parameters:

1. A string representing the url to be accessed.
2. A function that will be called once the data has been retrived from the url. This was defined earlier in the script and takes 3 parameters.

```javascript
request.get(url, printRates)
```

This is a common construct used in JavaScript/NodeJS. The second function parameter is known as a **callback**.

NodeJS is a single-threaded event loop that processes queued events. This means that if you were to execute a long-running task within a single thread then the process would block. To solve this problem, NodeJS  relies on callbacks, which are functions that run after a long-running process has finished. Instead of waiting for the task to finish, the event loop moves on to the next piece of code. When the long-running task has finished, the callback is added to the event loop and run.

Because callbacks are such a fundamental part of NodeJS you need to spend time to make sure you fully understand how they work.

Try running the `currency.js` program and note the output (remember you will need to install the `request` package.

1. The currency code we want to convert to is stored in a constant.
2. We create a _function expression_ called `printRates()` which has three parameters and prints out data from the response:
    1. An error, this will be `null` if there is no error.
    2. An object containing all the data from the HTTP response.
    3. The string returned in the response body.
3. Next we use a [template literal](https://goo.gl/3vznuR) to create the URL we will be calling.
4. Finally we call the function stored in the `get` key in the `request` object and pass the string and function literal we created earlier.

#### 1.3.1 Using Anonymous Functions in Callbacks

Although this code works, you will rarely see callbacks written in this manner. Creating a function literal is a bit clunky and we can clean up the code by simply passing an anonymous function.

```javascript
request.get( url, (err, res, body) => {
  // callback code goes here.
})
```

Take a few moments to make sure you fully understand the syntax, you will be seeing a lot of this over the next few weeks.

#### 1.3.2 Test Your Understanding

Lets improve the currency exchange tool. You will need to refer to the API [documentation](http://fixer.io) as you work through the tasks.

1. Replace the _function expression_ with an _anonymous function_.
2. Print the entire response body to the terminal window using [json.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
3. The **base rate** defaults to the € (EUR) however the API allows you to set a different currency as the base rate:
    1. Add a constant `base` to store your preferred currency.
    2. Modify the URL using the API documentation to guide you.
4. Use the [Number.prototype.toFixed()](https://goo.gl/DU4hvd) to truncate the number to 2 decimal places.
5. Finally, modify your program so that it throws an error if it doesn't recognise either of the currency codes.

## 1.4 Nested Callbacks

Because the code to be run after a callback is run needs to be _inside_ the callback code it is very challenging to build a script that contains several long-running tasks you get into a situation where you nest callbacks inside callbacks (inside callbacks) which makes the code very difficult to write, debug and read and means its very difficult to split into separate functions, a situation commonly known as **Callback Hell**.

Open the file `nestedCallbacks.js` which asks for a _base_ currency code then prints out all the exchange rates against other currencies. Notice that there are four functions defined, three of which include a callback. Our script is designed to capture user input using `stdin` (needing a callback), identify whether a currency code is valid (requiring a second callback) and then getting the currency conversion rates for the specified currency (requiring a third callback).

1. Notice that the `checkValidCurrencyCode()` function is called by the callback for the `getInput()` function and the `getData()` function is called by the callback for the `checkValidCurrencyCode()` function.
2. Each callback takes two parameters as normal. The first contains the error (if any) and this needs to be handled in each callback.
3. The data from the first callback is needed when calling the third function so needs to be stored in an immutable variable (constant).
4. The fourth, and final, function does not have a callback.

Callbacks are the simplest possible mechanism for asynchronous code in JavaScript. Unfortunately, raw callbacks sacrifice the control flow, exception handling, and function semantics familiar from synchronous code.

### 1.4.1 Test Your Knowledge

The callbacks are already nested 3 deep. To test your knowledge of deeply nested callbacks you are going to create a script that has 6 levels of nested callbacks!

1. modify the script to ask for the currency to convert to and display only the one conversion rate.
2. instead of printing the exchange rate, ask for the amount to be converted and them return the equivalent in the chosen currency
3. use the [OpenExchangeRates](https://openexchangerates.org/api/currencies.json) API to display the full name of the chosen currency.

Even though the script is still simple you are probably already getting in a tangle! Imagine a more complex script with conditions, it would quickly get out of hand and become practically impossible to debug.

## 2 Objects

Lets start by creating an manipulating objects using **object literals**. Open the `employee.js` file, read through it and see if you can work out what it does. Now run it to see if you were correct.

### 2.1 Creating Object Literals

The simplest way to create new objects is by creating an _object literal_ which is defining an object and storing it in a variable. You should open the `employee.js` file which contains the code.

```javascript
const employee = {
  firstName: 'Colin',
  'last name': 'Stephen'
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

#### 2.1.1 Test Your Understanding

1. Add a property called `gender` and assign a suitable String value.
2. Add a new property called `date of birth` that stores the year the person was born and assign a suitable value.

### 2.2 Retrieving Object Properties

Whilst it is possible (and useful) to log an entire object to the console, normally we would want to retrieve the values of specific properties.

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

Passing the object name to `console.log()` will print out the string representation of the object. To retrieve a specific property value there are two options. If the name is a _legal JS variable name_ the dot `.` notation can be used. This is used to log the `firstName` property in the example above.

If the name is not a valid JavaScript variable name we need to turn it into a string by using quotes `''` and enclose it in square braces `[]`. This is used to log the `last name` property.

The `grade` variable will be `undefined` because `employee.grade` does not exist. If you want to avoid this and assign a default value if the property is missing you can use the **OR** operator `||`.

```javascript
const grade = employee.grade || 'A'
```

This will retrieve the value of the grade property if defined and store it in the `const` variable. If this property is missing the `const` variable will contain the string `'A'`.

### 2.3 Getters and Setters

Most object properties are simple values and you can simply assign a value. Sometimes however properties need to be calculated. One solution is to store a function as one of the properties however we would need to call a function to retrieve the value:

```javascript
const employee = {
  firstName: 'Colin',
  'last name': 'Stephen',
  getName: () => `${this.firstName} ${this['last name']}`
}

const name = employee.getName()
```

Whilst this works fine it looks a little clunky. Thankfully in the newer versions of JavaScript you can use a **getter** which makes the code far more intuitive.

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

By using a **setter**, it behaves just like any other property.

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

#### 2.3.1 Test Your Understanding

1. Print the person's details in an easy to understand sentence.
2. Add a getter to return the number of years the employee has been working for the company, you will need to round this down to a whole number. You should make use of one of the static methods of the built-in [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object.

### 2.4 Modifying Objects

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

### 2.5 Undefined Values

Undefined Objects

If you try to retrieve a value from an object that is undefined, JS throws a TypeError exception:

```javascript
const nonExistentObject.postCode // throws "TypeError"
const addressObject = employee.address  // returns undefined
const postCode = employee.address.postCode // throws "TypeError"
```

To see what a `typeError` looks like, try uncommenting the three lines at the end of the `employee.js` file. So how can we avoid this?

The **AND** operator `&&` can be used to guard against this problem.

```javascript
const postCode = employee.address && employee.address.postCode
console.log(postCode) // returns undefined
```

#### 2.5.1 Test Your Understanding

1. Modify the code to handle bad data:
    1. Remove the startYear property.
    2. Set the startYear property to a String.

### 2.6 Object Prototypes

All JavaScript object (such as String, Number, Array, etc.) inherit properties and methods from a **prototype**. This also applies to any new objects you create. Since JavaScript does not support _traditional_ classes, this becomes the way to add new functionality. Let's look at a simple example.

The `String` object does not have a way to convert a string into an array of characters so we will add this. After it is added we can see that _all strings_ have this new behaviour.

```javascript
String.prototype.toArray = function() {
  const strArr = this.split('')
  return strArr
}

const nameArray = 'John Doe'.toArray()
console.log(nameArray)
```

There are a couple of important concepts here.

1. Notice that the function is _not_ defined using the arrow syntax `=>`, this is because we need the function to have its own _context_, this does not happen with arrow functions.
2. Inside the function we manipulate the `this` object which represents the value of the object.
    1. Replace the `function() {}` construct with an arrow function. What happens when you run the script?

#### 2.6.1 Test Your Understanding

1. Extend the `Array` object by adding a function `toStr()` that takes an array and turns it into a string. You will need to use the [`Array.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) function.

## 2.7 Functional Programming

One of the more intriguing features of JavaScript is its support for a paradigm called **functional programming**. In simple terms this includes:

1. The contents of a variable can't change once assigned (constants only).
2. The elimination of loops and control structures.
3. The use of higher-order functions.

Whilst this list is far from complete it allows us to experiment with an alternative (and powerful) way to write programs. Open the `functional.js` file to understand how this is achieved. In it we will be manipulating lists of data (arrays) by applying the functional concepts listed above.

### 2.7.1 Map

The `Array.map()` function creates a new Array by calling the provided function on each element.

In this example, we define a function called `makeUpperCase()`. The parameter will be the array index. This is then passed to the `Array.map()` function

```javascript
const names = ['Mark', 'John', 'Stephen']

function makeUpperCase(name) {
  return name.toUpperCase()
}

const upper = names.map(makeUpperCase)
```

Whilst this works fine we normally avoid creating a named function and pass an anonymous function. The example below has identical functionality to the previous example.

```javascript
const names = ['Mark', 'John', 'Stephen']

const upper2 = names.map( value => {
  return value.toUpperCase()
})
```

By using the Arrow Function the return statement is inferred if the parenthesis (`{}`) are removed. The example below is logically identical to the example above.

```javascript
const names = ['Mark', 'John', 'Stephen']

const upper3 = names.map( value => value.toUpperCase() )
```

#### 2.7.1.1 Test Your Understanding

1. Use the `Array.map()` function to create an array with all the names in lower case only.

### 2.7.2 Filter

The `Array.filter()` method creates an array filled with all array elements that pass a
test (provided as a function)

```javascript
const data = ['Coventry', 3.14159, 42]

function getInt(val) {
  if (Number.isInteger(val)) {
    return true
  }
  return false
}

const integers = data.filter(getInt)

const integers = data.filter( val => Number.isInteger(val) )
```

As before we can use the feature of the arrow function syntax to reduce the above to a single line.

```javascript
const integers = ['Coventry', 3.14159, 42].filter( val => Number.isInteger(val) )
```

Here is an example showing the use of the `typeof` statement to return values of type `String`.

```javascript
function getStr(val) {
  if (typeof val === 'string') {
    return true
  }
  return false
}

const strings = ['Coventry', 3.14159, 42].filter(getStr)
```

As before we can rewrite this as a single line. This is logically identical to the example above.

```javascript
const strings = ['Coventry', 3.14159, 42].filter( val => typeof val === 'string')
```

#### 2.7.2.1 Test Your Understanding

1. eturn an array that only contains floating point numbers (non whole numbers). Hint: Since all numbers are the same data type (Number) you will need check both the data type and whether it is a whole number (using modulo division).
2. Now turn it into a single line function by removing the braces and return statement. */
3. You should now be able to return an array that only contains integers (whole numbers). */

### 2.7.3 Reduce

The `Array.reduce()` function takes an array and reduces it to a single value using
an _accumulator variable_ to track the result. Notice that the anonymous function has 2
parameters, the accumulator (that passes its current value) and the array value.
The value returned by the function becomes the value of the accumulator.

```javascript
function getLongest(acc, val) {
  if (val.length > acc.length) {
    return val
  } else {
    return acc
  }
}

const longest = ['Mark', 'John', 'Stephen'].reduce(getLongest)
```

Again, we can use an anonymous function to avoid having to define the named function.

```javascript
const longest = ['Mark', 'John', 'Stephen'].reduce( (acc, val) => {
  if (val.length > acc.length) {
    return val
  } else {
    return acc
  }
})
```

The `Array.reduce()` function takes a second parameter which allows you to specify an initial value for the accumulator (if this is omitted it is assigned a value of `0`). This allows the function to be used in a number of surprising ways. Take a look at the followin example and see if you can figure out what is does and how it works.

```javascript
function reverse(acc, val) {
  return val + acc
}

const rev = 'william'.split('').reduce(reverse, '')
```

As before, we can use an anonymous function.

```javascript
const rev = 'william'.split('').reduce( (acc, val) => {
  acc.unshift(val)
  return acc
}, [])
```

And by taking advantage of the arrow function syntax we have a single line.

```javascript
const rev = 'william'.split('').reduce( (acc, val) => val + acc, '')
```

#### 2.7.3.1 Test Your Understanding

1. Write a single-line script to return the longest name in an array. You will need to use the `Conditional Operator`.

### 2.7.4 Chaining

One of the benefits of these array functions is that they are applied to arrays and they each return an array. This means that we can combine them to solve more complex problems.

#### 2.7.4.1 Test Your Understanding

1. Return the largest integer by chaining filter and reduce.