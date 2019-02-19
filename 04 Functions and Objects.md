
# Functions and Objects

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
    a. If the name comprises more than one word these should be written using camel casing as shown above. This is known as a **Function Declaration**
2. The function above takes two parameters, `a` and `b`.
    - These are variables with local scope (they can't ba accessed outside the function)
    - When the function is called, you need to pass two **values** which get assigned to the two parameters.
    - If you pass too many values the extra ones get _ignored_.
    - If you don't pass enough values the remainder are assigned a value of `null`. `Null` is an assignment value (means a value of no value).
3. The function returns a value.
    a. If the numbers are not the same it returns the largest.
    b. If they are the same it returns `null`.

#### 1.1.1 Test Your Understanding

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

This is known as storing a _function expression_ in a variable (or just a _Function Expression_ for short).

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

1. Refactor the `remainder2` function expression to take advantage of the implicit return (you will need to reduce it to a single line of code).
2. Compare this to the original version: which is more _readable_?
3. Create a function expression that takes two string parameters and returns the longest string and assign this to a constant called `longest. check this works correctly.
4. Modify the function expression so that it can handle any number of string parameters (use a _rest parameter_).
5. Can you reduce this function expression to a single line (hint: explore using the [reduce function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) combined with the [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator))?

### 1.3 Callbacks

//TODO: need a replacemennt for the currency API (perhaps use screen scraping?) or books?

NOT an API at this stage but reading/writing files?

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

## 2 Objects

Lets start by creating an manipulating objects using **object literals**. Open the `employee.js` file, read through it and see if you can work out what it does. Now run it to see if you were correct.

### 2.1 Creating Object Literals

The simplest way to create new objects is by creating an _object literal_ which is defining an object and storing it in a variable in a similar way to how we created function literals earlier in the lab. You should open the `employee.js` file which contains the code.

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

Passing the object name to `console.log()` will print out the string representation of the object. To retrieve a specific property value there are two options. If the name is a _legal JS variable name_ the dot `.` notation can be used. This is used to log the `firstName` property in the example above.

If the name is not a valid JavaScript variable name we need to turn it into a string by using quotes `''` and enclose it in square braces `[]`. This is used to log the `last name` property.

The `grade` variable will be `undefined` because `employee.grade` does not exist. If you want to avoid this and assign a default value if the property is missing you can use the **OR** operator `||`.

```javascript
const grade = employee.grade || 'A'
```

This will retrieve the value of the grade property if defined and store it in the `const` variable. If this property is missing the `const` variable will contain the string `'A'`.

#### 2.3.1 ECMA6 Object Destructuring

In ECMA6 is is possible to extract multiple pieces of data into separate variables by destructuring using an _object pattern_. This is syntactically similar to creating object literals (see the example below).

```javascript
const employee = {
  firstName: 'Colin',
  'last name': 'Stephen',
  'department': 'Computing'
}

let {firstName: first, 'last name': last, department: dept} = employee
console.log(first) // prints 'Colin'
console.log(dept) // prints 'Computing'
```

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

## 3 RESTful APIs and JSON Data

//TODO: write this section...!

### 3.1 JSON Data

Show how objects can be turned into strings and saved. text data loaded and converted into a JavaScript object.

#### 3.1.1 Test Your Understanding

### 3.2 RESTful APIs

Show how data can be retrieved from an API in JSON format.

//TODO: use the OMDB API in this section

OMDB key: 220d2590

First task is for students to get an OMDB API key and paste it into the provided script.

### 3.3 Nested Callbacks

Use the same API and show that multiple steps cause nested callbacks and callback hell.

//TODO: use the OMDB API in this section.

Find films released in year X starring Y in genre Z from producer A, etc. country B.

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
