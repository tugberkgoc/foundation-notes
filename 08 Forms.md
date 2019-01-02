# Forms

In this final part of the worksheet you will be building forms that can send data to a web server.

## 1 POST vs GET

Lets start by looking at how forms send data to the server. This can be done using the HTTP `GET` method or using the `POST` method. Lets try out both so we can understand the differences.

### 1.1 Submitting Data Using POST

Make sure the web server is running and access the `/postform` route and open the corresponding html file.

1. Complete the form with your name.
2. Click on the the **Submit** button.
3. Examine the URL carefully:
    1. Notice that it points to the base route `/` with no additional data in the URL.
4. Open the _Chrome developer tools_ and look at the _http request_:
    1. Notice that the request uses the `POST` method. This corresponds to the `method` attribute in the `<form>` element.
    2. The request header includes a `Content-Type` header which contains the value `application/x-www-form-urlencoded`.
5. There is a _request body_ which contains the form data:
    1. This uses the `application/x-www-form-urlencoded` encoding.
    2. Notice that it contains 2 query parameters in a querystring.
    3. The names of the query parameters correspond to the values in the `name` attributes in the `<input>` elements.

### 1.2 Submitting Data Using GET

Make sure the web server us running and access the `/getform` route and open the corresponding html file.

1. Complete the form with your name.
2. Click on the the **Submit** button.
3. Examine the URL carefully:
    1. Notice that it contains 2 query parameters in a querystring.
    2. The names of the query parameters correspond to the values in the `name` attributes in the `<input>` elements.
4. Open the _Chrome developer tools_ and look at the _http request_:
    1. Notice that the request uses the `GET` method. This corresponds to the `method` attribute in the `<form>` element.
    2. The URL contains the data (remember there is only a request _body_ when the `POST` method is used.

## 2 Form Controls

In the previous section the form used the `<input>` element which displayed simple text boxes where you could enter anything. In this section you are going to learn about how to use a wide range of different controls to capture user input.

### 2.1 Input Elements

HTML defines a number of input types that can be used in forms. The commonly used ones are:

- Plain text: `<input type="text">`
- Password fields: `<input type="password">`
- Email addresses: `<input type="email">`

The above are supported by most browsers. There are some new input types also:

- URL addresses: `<input type="url">`
- Numeric data: `<input type="number">`
- Date pickers: `<input type="date">`

The main reason for introducing these new input types is for mobile devices with limited screen sizes where special keyboards/input methods can be used.  But note that not every browser supports the new types.

> Input types, not supported by old web browsers, will behave as input type text. See [here](http://www.w3schools.com/html/html_form_input_types.asp).

![android picker](http://developer.android.com/images/ui/pickers.png)

### 2.2 Hidden parameters

Sometimes we need a way to submit some additional parameter to the server. This can be done by using a `hidden` input parameter.
A hidden parameter has no onscreen appearance, but it will be sent to the server.

```html
<form>
......
    <input type="hidden" name="org" value="Acme" />
    ....
</form>
```

### 2.3 Lists

The problem with the `<input>` elements is that it forces users to input _free text_ which means the data will require a lot of validation. For example if asked to input a city users might enter `Coventry`, `coventry`, `Cov`, `Coventry City` and any number of variations. Where possible you should require users to choose from a predefined list.

There are two ways to define a list, radio/checkboxes and dropdown lists. Load the `/lists` route in your browser to see these in use. Make sure the web server is running, access the `/lists` route and open the html file that is being displayed.

Whilst not strictly a list, **checkboxes** can be used where the user can pick one or more options from a short list.

```html
<input type="checkbox" name="foo" value="1">Option 1<br/>
<input type="checkbox" name="bar" value="2">Option 2<br/>
```

Notice:

1. It uses the standard `<input>` element.
2. The `type` attribute has a value of `checkbox`.
3. Each has a _different_ value for their `name` attribute.
4. The `value` atribute contains the value that is passed to the server.

Radio buttons are to allow the user to make a selection from a small number of options:

```html
<input type="radio" name="foobar" value="1">Option 1<br/>
<input type="radio" name="foobar" value="2">Option 2<br/>
```

Notice:

1. It uses the standard `<input>` element.
2. The `type` attribute has a value of `radio`.
3. All grouped options must have the same value for their `name` attribute.
4. The `value` atribute is what is passed to the server.

The `select` element defines a drop-down list, and the `option` element is used to define a list item.

```html
<select name="example">
  <option value="notknown">Not selected</option>
  <option value="item1">Item 1</option>
</select>
```

Every `option` element should have a unique value, just like in checkboxes and radio buttons.

### 2.4 Test Your Understanding

1. Create a new route in the `index.js` file called `/register`.
2. Create an html file called `registerform.html`.
3. Create an html form that `POST`s its data to `/`.
4. Create a registration form using all of the different form controls you have seen.
5. Make sure you understand the data displayed when the form is posted.
6. Change the form so it makes a `GET` request.

## 3 Labelling Forms

`<label>` elements are used to connect texts and controls that are used together in forms. For example radio buttons and check boxes often come with preceding texts that describe the choice. However if the user clicks the text nothing happens. That's because the browser doesn't know the connection between the text and the neighboring control. They must be wrapped up with label element.

```html
<form action="">
<input type="checkbox" name="bike" value="Bike">I have a bike<br>
<input type="checkbox" name="car" value="Car">I have a car
</form>
```

You have to click on the box. But if you have

```html
<form action="">
<label><input type="checkbox" name="bike" value="Bike">I have a bike</label><br>
<label><input type="checkbox" name="car" value="Car">I have a car </label>
</form>
```

It is enough to click on text too.

Note the above can also be written as the following, which is also valid but needs more typing

```html
<form action="">
<input type="checkbox" name="bike" id="bike" value="Bike"><label for="bike">I have a bike</label><br>
<input type="checkbox" name="car" id="car" value="Car"><label for="car">I have a car </label>
</form>
```

> Read discussions on [StackOverFlow](http://stackoverflow.com/questions/774054/should-i-put-input-tag-inside-label-tag) for different ways of associating labels and inputs.

### 3.1 Use grouping and hints

In many user interfaces, you can see how different elements on the screen are grouped together in order to make the input easier for the user. In HTML, you can use `fieldset` element for this.

```html
<form action="">
<fieldset>
<legend>Credit Card</legend>
<label><input type="radio" name="card" value="Visa">Visa</label><br>
<label><input type="radio" name="card" value="MCard">MasterCard </label>
</fieldset>
</form>
```

What you get is

![Example of a fieldset and legend](exercises/.images/fieldset.png)

In user interfaces it also a common practice to give hints on the kind of data is expected. In HTML, this can be achieved by `value` or `placeholder` attribute on the controls. The `placeholder` attribute's text disappears once the control is clicked in or gains focus and the `value` attribute's text stays in place when a control has focus unless a user manually deletes it.

![Example of a value and placeholder](exercises/.images/input_hint.png)

### 3.2 Test Your Understanding

Make sure the web server is running and access the `/semantic` route. Open the html file containing the form that is being diplayed.

1. At the moment, you have to click exactly the right spot on your checkboxes etc. Change this by using labels.
2. Rearrange your form with legends and fieldsets in order to make it easier for the user to understand.
3. Give input hints to the user whenever possible.

## 4 Form Validation

Form validation is traditionally done using JavaScript. But HTML5 introduces some new ways of doing it, which makes validation a lot easier.

### 4.1 'required' attribute

Now return to the very first example in this lab

```html
<form action="http://www.google.com/search">
  <div>
    Let's search Google:
    <input name="q">
    <input type="submit">
  </div>
</form>
```

If we add a `required` attribute to the query input, it will become `<input required name="q">`. In this case, the query field is required. In other words, if we don't type in anything in this field, we'll have an error message when trying to click submit.

![Example of an error message](exercises/.images/error_html5.png).

Behind the scene, the browser tries to verify user's input. There are some other input attributes that can serve for validation purposes. For example, `min` and `max` attributes for numerical input types such as `number` or `month`; `size` and `maxlength` for limiting the number of characters entered.

### 4.2 'pattern' attribute based on regular expression

In addition to using different input types, we can also use patterns a.k.a.regular expressions. Using patterns, we can validate user inputs even more precisely.

Pattern is an encoded sequence of characters that define a pattern of text characters. Remember that client-side validation is not reliable as the only means of validation, it is useful to make the user interface more pleasant.

For example, a Finnish social security number (similar to UK National Insurance number) is often 999999-999X (for those who are born in the 20th century). The first 6 digits are the birth date: day, month and year's last two numbers. After "-" there are 3 digits and the last character can be either digit or letter from A to Y. If we want to make a pattern of this, it would be

```html
<input type="text" pattern="\d{6}\-\d{3}([0-9A-Y])" ...>
```

\d means a digit, \\- means the "-", [chars] means a set of characters.

## 4.3 Test your understanding

Open file **form-skel.html**. Validate the user's data in Student id, email address and score by using patterns.

## 5 Building a Dynamic Web Page

In this section we will be combining a lot of the concepts covered in previous labs to build a books website.

Now you have a working database containing some useful data you need to display this in a web page. Start by locating and running the `index.js` script in the `bookshop/` directory (you will need to install the dependencies first). Notice that there is a message in the terminal to let you know the script has connected to the database. Now view the web page, notice it displays the book titles from your database (including the ones you added).

This is known as a dynamic (or data-driven) website. By the end of this section you will have a clear understanding of how this can be created using NodeJS. Lets look at how this works. Open the `index.js` script.

1. The top of the script imports and configures the express package. This is identical to the previous scripts you have written.
2. One line 18 we import the sqlite3 package and then directly below this we create a `Database` object that points to the `bookshop.db` database we worked on earlier. The callback is triggered either when the database is connected or an error occurs.
3. Underneath this is the first of two routes. This first one `/` will be used to display a list of books.
4. the first step (on line 26) is to write an SQL statement to retrieve all the book titles and their primary keys from the `books` table. We display this in the terminal to check the syntax.
	1. Copy this SQL statement and, using either the CLI or GUI tools, run this against your database to check it works as expected.
5. Now we call the `all()` function that is part of the database (`db`) object. This takes two parameters:
	1. The SQL statement we created previously.
	2. A _callback_ function to run once the statement has been executed. This takes two parameters, an error object (null if no error) plus a data object that contains an array of JS objects containing the data returned from the query.
6. We now print the data object to the terminal. Note that it is not easy to read.
	1. Replace line 30 with `console.log(JSON.stringify(data, null, 2))`. What has changed? Can you explain why?
7. We need to convert this array into a suitable chunk of html that we can insert into the page template.
	1. We start by creating a variable and storing the opening list element.
	2. We loop through the array and for each index we take the data, wrap it in html tags and append it to the variable.
	3. Finally we append the closing list element.
8. We print this to the terminal on line 37 to check the html is correct.
9. Finally we pass this string to the `index.html` template and render it in the browser.

### 2.1 Test Your Understanding

1. Convert the html list into a 1 column html table.
2. Add and link a stylesheet to display the table clearly.
3. Modify the html to retrieve the publication year.
4. display the publication year in a second column.
5. Add a third column that displays the text `details` for each book.

## 3 Adding Search Functionality

There are not many books in our database so displaying them all is not a problem however once we increase the number of books significantly we need to find a way to filter them. In this section we will be implementing a simple search functionality. Start by opening the `index.html` template file.

1. If you look directly under the first route you will see a second route commented out (lines 42-63). Comment out the route you have been using in section 2 and uncomment this one. Restart the script.
2. Notice the route uses a different template (`newindex.html`) which contains an html form. This will display a search box and button.
3. Type in your search term `sqlite` and click on the search button, this reloads the page. You will see the search term `sqlite` remains in the text box and the page displays the books that match your search term.
	1. Click in the _address bar_ in your browser and look carefully at the URL.
	2. It ends with the string `?q=hello`.
	3. Examine the attributes in the html form element:
		1. The `action="/"` attribute tells the form to send the data to the root URL.
		2. The `method="get"` attribute tells the form to pass the data in the URL.
	4. Examine the html for the text box:
		1. The `type="text"` attribute tells the browser to display a textbox.
		2. The `name="q"` tells the form to submit the contents of the textbox as an object called `q`, this explains the string in the URL.
4. Lets examine the new routes file. This is contains all the code from the old version however you should note the key differences which will be analysed later:
	1. All the previous `console.log()` commands have been removed to avoid cluttering the terminal.
	2. The `for()` loop is now a single line so the curly braces have been removed.
	2. There is a block of new code (lines 45-52)
	3. The last line (line 60 has changed).
5. The new code block serves two purposes:
	1. It assigns a value to the `q` variable based on the query string passed in the URL (it default to a blank string).
	2. If there is a query string it replaces the previous SQL statement with one that carries out a search based on this value.
6. On line 60 the search string is passed to the page template. If you examine the html form you will see that this is used as the `value` attribute in the textbox, this is how the search string _remains_ in the search box after the search.

### 3.1 Test Your Understanding

1. You have probably noticed that the search is case-sensitive. Use the SQLite `upper()` function to make the search case-insensitive.
2. The search ignores the author, publisher and year fields, change the SQL query to include these.
3. Insert a `h2` element that displays the text `xx results for "yyy"` where xx contains the number of results found and yyy is the query. This should not be displayed at all if the search box is empty.

## 4 Passing Data Between Pages

At the moment we are only displaying some of the data for each book such as the title. If we tried to retrieve _all_ the data for _all_ the books this would take a lot longer to load and be very cluttered. The solution is to create another page to display all the data for a selected book.

Make sure the script is running and try accessing the `/details/1` route. This displays detailed information on the first book in the database (the one with the primary key `1`). What happens if you change this to `/details/2`? By passing the book id in the URL we can tell the page which book details to display. Open the `index.js` file and locate the `/details/:id` route that starts on line 65.

1. The route contains two segments:
	1. The first segment must be the string `details`.
	2. The second segment can be anything at all. This value can be accessed in the `req.params` object.
		1. Because the route defines `:id`, this is the object key it will be stored under, `req.params.id`.
	3. This value is used to build the SQL statement (line 67) which is displayed in the terminal.
2. Now we call the `all()` function that is part of the database (`db`) object. This returns a JavaScript object containing the first matching record.
	1. The callback runs after the query completes or an error occurs.
	2. If no error occurs, the entire object is displayed in the terminal and passed to the html template.
3. If you open the `details.html` template you can see the placeholder names match the database fields.

### 4.1 Linking the Pages

Now we have built the book details page we need to add hyperlinks to each book in the table. Clicking on the link will load the correct book details.

1. Locate the point where you are looping through the array of books and building the html list/table.
2. Wrap the book title in an html `a` element.
	1. The `href` attribute should point to the details page and pass the id field for the book:
	2. Here is a clue: `<a href="/details/${book.id}">${book.title}</a>`.
3. Restart the script and see if the links are displayed correctly.
4. If you click on one of these links does it load the correct book details?

### 4.2 Test Your Understanding

1. The descriptions in the database contain newline `\n` characters but these are ignored by the browser. use the `String.replace()` function to replace these with `</p><p>` so that the paragraphs are preserved.
2. You have added additional fields to the database but these are not shown. Modify the script (and the html template) to display these missing fields.
3. The _page title_ currently displays the text `Bookshop`. Change this to display the name of the book.
4. Add a back button to return to the search page.
	1. What has happened to the search filter when you go back to the previous page?
	2. You will need to pass this to the details page and pass it back when the back button is clicked.

# 5 Inserting Data

So far we our dynamic website has been working with data from the database but we have not been able to add new records to the database. In this section we will be building a form to let us add data.

To create a working form you need to have two routes:

1. The first (get) displays the form.
2. The second (post) inserts the data and then redirects back to another page.

There is already a working form. Access the `/form` route in your browser, this will display a simple html form where you can enter a book title, isbn and description. Try adding a book using this (there are some extra examples in the `books.csv` file). Notice that when you click on the add button you end up back at the list of books and the new one has been added to the end. Lets look under the bonnet to see how this has been achieved. Open the `index.js` script.

1. Towards the end of the script there is a `/form` route which sends the contents of the `form.html` file to the browser. This is how we display the form.
2. In the `form.html` file you will see that we have created a simple html form. Note:
	1. The `form` element contains a couple of important attributes:
		1. The `action="/add"` attribute directs the form to send its data to the `/add` route.
		2. The `method="post"` attribute directs the form to send its data in the message body and not in the URL.
		3. Taken together it means that the data will be sent using the POST method to the `/add` route.
	2. Each form element has a `name` attribute which defines the object key each piece of data can be found under.
3. In the `index.js` script you will see a route `app.post('/add', callback)`, it is this that will be called when the form data has been submitted.
	1. All the post data can be accessed through the `req.body` object and, on line 81 we print this to the terminal to check all the data is there.
	2. Next we use this data to build an SQL statement to insert a new record into the database.
	3. The `db.run()` function executes the SQL statement and the callback runs either on success or if there was an error.
	4. Finally, as soon as the SQL statement has run we redirect the browser back to the main page which will display all the book records including our new one.

### 5.1 Test Your Understanding

1. Modify the form to add the additional fields of data you have added to the books table (author, publisher, year).
2. Modify the `app.post('/add', callback)` to insert this additional data into the database.
3. Add a link to the home page to take the user to the new book form.
4. Add a _Cancel_ link on the form to return the user to the home page.
5. Style the table to improve its appearance and usability.
