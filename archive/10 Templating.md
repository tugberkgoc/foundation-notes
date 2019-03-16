
# Templating

Up to now you have seen two ways the server can send response data to the client web browser:

1. Sending the contents of an HTML file. This is great for complex web pages but you can't include dynamic data.
2. Using the `res.write()`, `res.send()` and `res.end()` functions to send dynamic data. The limitation is that its quite clunky and would be completely inpractical for complex web pages.

In this section you will be introduced to a third approach which combines the best features of each the other two approaches, the use of a **templating view engine**.

There are a number of _templating view engines_ that are compatible with Express however in this worksheet we will be using one of the more popular ones, called [Handlebars](https://www.npmjs.com/package/handlebars). This needs to be imported into your script and set the default _layout page_.

Locate the files in the `06_templating/01_date/` directory, install the dependencies and start the server.

## 1 Basic Templating

Access the base route `/`, notice that you are seeing a basic html page. Open the script:

1. We start by importing the Handlebars package and create a default layout called main. This defines the `main.handlebars` page as the one to use as the default website layout.
	1. Open the `views/layouts/main.handlebars` file.
	2. This template page will be used by _all_ the pages in the website.
	3. Notice there is a `{{{body}}}` placeholder, this defines where the different page templates will be inserted.
2. In the base route `/` we call the `res.render()` function and pass it the name of the template we want to use:
	1. The parameter is a string, `home`.
	2. This refers to the template `views/home.handlebars`
3. The contents of the `home.handebars` template is inserted into the layout file replacing the `{{{body}}}` placeholder.

### 1.1 Test Your Understanding

1. Create a `/hello` route that uses a template file called `hello.handlebars` to display a heading with the text `Hello World!`
2. Use the knowledge from the css lab to add and link an external stylesheet to display the heading in red.
	1. Define a directory for static files.
	2. Create a `style.css` file in this directory that sets the heading red.
	3. Add a link to the _main layout_ file to import this stylesheet.

## 2 Inserting Data into a Template

So far we have not done anything particularly useful except separate out the _layout_ from the content. In this section you will learn how to insert data directly into a template before it is rendered to the browser.

In the previous example you have seen how to insert single values into a web page but how to we display lists of data? A list is stored in an **array** in JavaScript so the first task is to ensure your data is in an array. If you recall lab 3 you will remember that the sqlite `db.all()` function returns an `Array`.

Restart the server and access the `/date` route. Notice that it displays the current date in the browser. Open the `index.js` file and locate the route.

1. We start by creating a new `Date` object.
2. We use its built-in functions to create a string containing the current date.
3. Next we create a JavaScript object that contains all the data we want to send to the template:
	1. In this example we have a `title` property containing the string `My First Template`.
	2. We have a seccond property called `today` that contains the date string we have just built.
4. Finally we call `res.render()` but this time we pass the data as the second parameter.

To understand what happens to this data we need to understand the _template_. Locate the `views/date.handlebars` template file:

1. Notice that there are two _placeholders_, shown as `{{xxx}}`.
	1. Each placeholder has a name.
	2. The names need to match the properties in the data we are sending to the template.
2. Each placeholder is replaced by the data stored against the object property:
	1. The `{{title}}` placeholder is replaced by the string `My First Template`.
	2. The `{{date}}` placeholder is replaced with the date string we built in the script.

### 2.1 Test Your Understanding

1. Use suitable properties of the [`Date` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) to display the date in a variety of different formats in a series of paragraph elements:
	1. dd/mm/yyyy
	2. a Unix timestamp (number of seconds since 1st Jan 1970)
2. Add a table to display some information about the client computer (using the `req.connection` object).
3. Extend the table to display the header information (using the `req.headers` object).

## 3 Repeating Data

So far we have inserted data from object properties into our templates. This works find for single records however often we will have multiple records to display such as the results of a database query. In this situation we will need to repeat a block of html code such as a list item or table row.

Restart the server and view the `/food` route. Notice that it displays a numbered list showing four food items. Locate the route in your script.

1. We start by creating an array. Each imdex contains an object with two properties, name and qty.
2. We pass the array to `res.render()` as a JavaScript object using the myFood property.

Open the `food.handlebars` template:

1. Notice that there is an ordered list element.
2. Inside this there is a special **helper**, `{{#each myFood}}`
	1. The helper also has a closing block `{{/each}}`
	2. The `myFood` property is passed to the opening block.
3. This block loops through the array stored in the `myFood` property.
4. The `this` object holds the object for the current index.
	1. So `this.item` returns the `item` property (the name of the food item).

This allows the handlebars template view engine to handle repeated data.

### 3.1 Test Your Understanding

1. Modify the template to display the shopping items in a html table instead of an ordered list.
2. Add a second column to display the quantities of each item.
3. Add a table header to display column headings.
4. Without adding any more html, colour every other row of the table in light grey.

## 4 Putting it Together

You have covered a lot of topics over the first few weeks of the module. Before you continue, complete the challenges listed below. These will help you revise all the content you have covered.

The `02_bookshop/` directory contains a 2-page template-driven dynamic website based on the data you used in the **Databases** lab. Install the dependencies, start the server and access the base route `/` and the `/details/1` route then study the script `index.js`.

Now try to complete the following challenges:

1. Add a route called `/about` that displays information about the fictional bookshop.
2. Add a footer that appears on all pages using the correct html5 element.
3. Convert the list of books into a table.
4. Add a column to display the ISBN number
5. Add a hyperlink to the book titles to jump to the correct book details page.
6. Add a column that displays links to take you to the [Amazon product page](https://www.amazon.co.uk/gp/search/ref=sr_adv_b/?search-alias=stripbooks&field-isbn=9781491943120) (hint: use the ISBN number and study this link carefully!).
7. Create and link a stylesheet to improve the page appearance:
	1. Style the header.
	2. Style the footer.
	3. Make the table easier to read.
8. Add all the database fields to the product details page.
9. Modify the stylesheet to improve the appearance.
