
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

## 2 Callbacks

Since JavaScript supports _first class functions_, we can use a function in any place where we could use a literal, object or variable. Open the `currency.js` script and look at line 17. As you can see the `request` object has a key called `get` that stores a function (we have already covered this). This takes two parameters:

1. A string representing the url to be accessed.
2. A function that will be called once the data has been retrived from the url. This was defined earlier in the script and takes 3 parameters.

```javascript
const printRates = (err, res, body) => {
  const data = JSON.parse(body)
  console.log(`for each EUR you will get ${data.rates[symbol]} ${symbol} today`)
}
request.get(url, printRates)
```

This is a common construct used in JavaScript/NodeJS. The second function parameter is known as a **callback**.

NodeJS is a single-threaded event loop that processes queued events. This means that if you were to execute a long-running task within a single thread then the process would block. To solve this problem, NodeJS  relies on callbacks, which are functions that run after a long-running process has finished. Instead of waiting for the task to finish, the event loop moves on to the next piece of code. When the long-running task has finished, the callback is added to the event loop and run.

Because callbacks are such a fundamental part of NodeJS you need to spend time to make sure you fully understand how they work.

### 2.1 Using Anonymous Functions in Callbacks

Although this code works, you will rarely see callbacks written in this manner. Creating a function literal is a bit clunky and we can clean up the code by simply passing an anonymous function.

```javascript
request.get( url, (err, res, body) => {
  const data = JSON.parse(body)
  console.log(`for each EUR you will get ${data.rates[symbol]} ${symbol} today`)
})
```

Take a few moments to make sure you fully understand the syntax, you will be seeing a lot of this over the next few weeks.

### 2.1.1 Test Your Understanding

You are now going to apply you knowledge of JavaScript callbacks by connecting to the [Open Weather API](https://openweathermap.org/api). Start by opening the `weather.js` file:

1. Read through the code to make sure you understand how it works.
2. Register for an API key and add this to the script where indicated.
3. Run the script and check the output, can you explain the first two lines of output, why are the data types as shown?
4. Can you make sense of the other data?
5. Use the [Open Weather API](https://openweathermap.org/api) to retrieve and display the hourly forcast.

## 2.2 Defining Functions with Callbacks

In the previous section you learned how to call pre-defined functions with callbacks. Now you will learn how to write your own functions that include callbacks. This is important since NodeJS has a single-threaded model and any activity that may take time to complete should never be in the main thread. By creating a function with a callback you can push the task onto its own thread and free up the main event thread.

Start by opening the `files.js` script and study it carefully:

1. Notice that we are reading and writing to files in the main thread! This would normally block the thread, slowing down the program execution.
2. Also notice that the reading and writing takes place in a function `savetext()` with a callback defined as its second parameter.
3. At the end of the `saveText()` function we execute the callback.
4. We can then call our `saveText()` function, passing an anonymous callback function as the second parameter, this is executed within the `saveText()` function.
5. The convention when defining functions that take a callback function is to define the error as the first parameter.

## 3 Objects

Lets start by creating an manipulating objects using **object literals**. Open the `employee.js` file, read through it and see if you can work out what it does. Now run it to see if you were correct.

### 3.1 Creating Object Literals

The simplest way to create new objects is by creating an _object literal_ which is defining an object and storing it in a variable in a similar way to how we created function literals earlier in the lab. You should open the `employee.js` file which contains the code.

```javascript
const employee = {
  firstName: 'Colin',
  'last name': 'Stephen'
}
```

As you can see from the simple example above, the data is stored in name-value pairs, referred to as **Properties**. This example is defining an object with **2** properties.

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

Passing the object name to `console.log()` will print out the string representation of the object. To retrieve a specific property value there are two options. If the name is a _legal JS variable name_ the dot `.` notation can be used. This is used to log the `firstName` property in the example above.

If the name is not a valid JavaScript variable name we need to turn it into a string by using quotes `''` and enclose it in square braces `[]`. This is used to log the `last name` property.

The `grade` variable will be `undefined` because `employee.grade` does not exist. If you want to avoid this and assign a default value if the property is missing you can use the **OR** operator `||`.

```javascript
const grade = employee.grade || 'A'
```

This will retrieve the value of the grade property if defined and store it in the `const` variable. If this property is missing the `const` variable will contain the string `'A'`.

### 3.3 JSON Data

JSON (JavaScript Object Notation) is a standard text-based format to represent structured data. This is very useful as it means we can take any JavaScript object and convert it into a text string. This can then be saved to disk or posted to a web server, etc. It also means that you can take a JSON-formatted text string and convert it into a complex JavaScript object!

#### 3.3.1 Parsing JSON Strings into Objects

It is trivial to convert a JSON string into an object using the `JSON.parse()` function. Study the following code carefully:

```javascript
const jsonstring = '{ "firstName": "Colin", "last name": "Stephen", "department": "Computing"}'
const employee = JSON.parse(jsonstring)
```

Notice that in a JSON string all the properties and values _must_ be enclosed in double-quotes. The constant `jsonstring` is a **String** but `employee` is a standard JavaScript **Object**.

#### 3.3.2 Converting Objects into Strings

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

#### 3.3.3 Test Your Understanding

Lets apply our knowledge of callbacks to implement a simple quotes tool.

1. Create a json-formatted text file called `quotes.json` containing 10 quotes, you can find lots of these on websites such as [brainyquotes](https://www.brainyquote.com/topics/inspirational). Each quote should include the quote and the author.
2. Create a new script called `quotes.js` and use the [`fs.readfile()`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) function to read the contents of the file and display it in the terminal.
3. The contents of the file is a utf8 string, use `JSON.parse()` to convert this into a JavaScript object (array) and print this to the terminal instead.
4. Create a loop to iterate through the array, printing the contents of each index.
5. Modify the code so that it only prints the quotes string (not the entire object).

### 3.3 ECMA6 Object Destructuring

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

### 3.4 Getters and Setters

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

#### 3.4.1 Test Your Understanding

1. Print the person's details in an easy to understand sentence.
2. Add a getter to return the number of years the employee has been working for the company, you will need to round this down to a whole number. You should make use of one of the static methods of the built-in [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object.

### 3.5 Modifying Objects

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

### 3.6 Undefined Values

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

#### 3.6.1 Test Your Understanding

1. Modify the code to handle bad data:
    1. Remove the startYear property.
    2. Set the startYear property to a String.

### 3.7 Object Prototypes

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

#### 3.7.1 Test Your Understanding

1. Extend the `Array` object by adding a function `toStr()` that takes an array and turns it into a string. You will need to use the [`Array.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) function.

## 4 Object Constructors

As you have seen from the previous section, each object (String, Number, etc) has its own _prototype_, but what about the custom objects you created? It turns out that these also have a prototype, _Object_. Any functionality you add to this will get added to _all the objects in your application!_. To get round this problem NodeJS has the `new` keyword. When this is used we can isolate any changes to the targeted object.

### 4.1 Object Constructor Functions

Until ECMA6, there wa a way to achieve this by using a **constructor function**. Whilst this is not now considered the optimal way to achieve our goal there are so many examples of this approach it is important you understand both the syntax and how it works. When we use this approach using the `new` keyword triggers four steps:

1. We create an empty object.
2. We set the its prototype property to the constructor function's prototype function.
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
	this.subject = course || 'not enrolled'
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
  const currentYear = 2019

  constructor(name, startYear) {
	  this.name = name
	  this.startYear = startYear || currentYear
	  this.years = currentYear - this.startYear
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
class Student {
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

Notice that the static vsriable `count` is public (so the `studentCount()` method is somewhat superfluous in this example!). This highlights one of the limitations of JavaScript, the lack of a simple way to define private attributes (variables and methods). The next section goes into this in more detail and explains some workarounds (hacks) to get around this.

### 4.5 Handling Data Encapsulation

In all of these objects all data is public (you can see the entire object by using `console.log()`). One of the weaknesses of NodeJS (and JavaScript in general) is that there is no clean way to _encapsulate_ data and make it hidden from the outside world. There are a number of techniques to get around this problem:

1. Storing the data in the class [constructor environment](http://speakingjs.com/es5/ch17.html#private_data_constructor_environment).
2. Using a naming convention such as starting all private data with an underscore.
3. Storing data in a [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).
4. Use a property who's key is a [Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol).

You should take time to understand the [pros and cons](https://2ality.com/2016/01/private-data-classes.html) of all four approaches.

### 4.6 Test Your Understanding

1. Create a **constructor function** called `OldVehicle` that includes `make`, `model` and `price` information. Use this to create two vehicles of your choice.
2. Use this to create a second **constructor function** class called `OldPickup` that includes `payload` and `seats` fields and use this to create two pickup objects.
3. Now use the same information to create a class called `NewVehicle` and extend this to create a class called `NewPickup` and use this to create two or more pickup objects.
4. Add a static member to capture the total value of all the pickup sales and print this to the terminal.



Show how objects can be turned into strings and saved. text data loaded and converted into a JavaScript object.

### 5.1.1 Test Your Understanding

### 5.2 RESTful APIs

Show how data can be retrieved from an API in JSON format.

//TODO: use the OMDB API in this section

OMDB key: 220d2590

First task is for students to get an OMDB API key and paste it into the provided script.

### 5.3 Nested Callbacks

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

### 5.4 Test Your Knowledge

The callbacks are already nested 3 deep. To test your knowledge of deeply nested callbacks you are going to create a script that has 6 levels of nested callbacks!

1. modify the script to ask for the currency to convert to and display only the one conversion rate.
2. instead of printing the exchange rate, ask for the amount to be converted and them return the equivalent in the chosen currency
3. use the [OpenExchangeRates](https://openexchangerates.org/api/currencies.json) API to display the full name of the chosen currency.

Even though the script is still simple you are probably already getting in a tangle! Imagine a more complex script with conditions, it would quickly get out of hand and become practically impossible to debug.
