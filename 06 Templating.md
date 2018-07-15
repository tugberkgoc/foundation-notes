
# Templating

Up to now you have seen two ways the server can send response data to the client web browser:

1. Sending the contents of an HTML file. This is great for complex web pages but you can't include dynamic data.
2. Using the `res.write()`, `res.send()` and `res.end()` functions to send dynamic data. The limitation is that its quite clunky and would be completely inpractical for complex web pages.

In this section you will be introduced to a third approach which combines the best features of each the other two approaches. Locate the files in the `06_templating/date/` directory.

There are a number of templating engines that are compatible with Express however in this worksheet we will be using one of the simplest ones, called . This needs to be imported into your script.

```javascript
const es6Renderer = require('express-es6-template-engine')
const app = express()
app.engine('html', es6Renderer)
app.set('views', 'html')
app.set('view engine', 'html')
```

Notice that we import the renderer then set it as the default html engine. We then tell the server where to find the html templates and finally set the view engine to html.

Any data we want to be embedded in the template needs to be added to a JavaScript object (`data` in this example). Finally we call the `render()` function of our response object (`res`) and pass it two parameters:

1. The name of the template file (without the file extension).
2. An object containing a `locals` key. This should contain the data we wish to insert in the template.

```javascript
const d = new Date()
const data = {
  title: 'My First Template',
  date: `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()}`
}
res.render('index', {locals: data})
```

The template file needs to have placeholders to indicate where the dataa should be inserted.

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body>
    <h1>${date}</h1>
  </body>
</html>
```

You can see a complete example in the `template/` directory.

### 3.1 Test Your Understanding

1. Create a css file and link it to the html template. Add some rules to improve the appearance of the page.
2. Display the date in a paragraph tag.
3. Change the top level heading to display the same information as the page title.
3. Add a table to display the following with explanations:
    1. The server hostname
    2. The IP address of the server
    3. The base URL
    4. The route

### 3.2 Repeating Data

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

### 3.3 Test Your Understanding

Open the `currency/` directory and examine both the `index.js` and `index.html` files to see a slightly more complex example.

1. Create a stylesheet linked to the html template.
    1. Add some rules to improve the appearance of the page.
2. Modify the template to display the currency and rates in a table.
3. Without adding any more html, colour every other row of the table in light grey.
4. Display the conversion rates to 2 decimal places.
5. Add a second text box to enter the amount of the base currency to convert.
    1. Display the amount of each currency you would get in a third column.
    2. Don't forget to include the currency code!

### 3.4 Mixing Structure and Logic

Can you spot the problem with the templating solution? In our previous examples we have always kept the _layout_ in the html file, the _appearance_ in the css file and all logic in the js file. By putting the `map()` function in the html template file we are starting to mix the concerns and this is not a good thing. Whilst we can't avoid this, there are steps we can take to minimise its impact.

If you think about how we did this you might have spotted an alternative approach: we could have created a string containing the data in the js file and passed this to the template. So why is this a bad thing?

In the `currency/` example we have added a small amount of js code to the template file but the script file contains no html. If we build the string in the js file we start introducing structural elements into the script file which prevents us from changing our minds about how to display the data (we are _baking in_ the structure).

#### 3.1.2 Test Your Understanding

Display a list of data on one of your web pages. You could choose from a ordered or unordered list, a definition list (as in the example) or even a table.
