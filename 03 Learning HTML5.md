
# Learning HTML5

In this worksheet you will be learning about the markup language HTML which is currently in version 5. The worksheet is split into five parts with the resources for each part in their own subdirectory. The `template.html` file contains a basic HTML5 template you will find useful when creating your own web pages.

```
└── 03_html
    ├── 01_syntax
    ├── 02_hypermedia
    ├── 02_lists
    ├── 03_hypermedia
    ├── 04_tables
    ├── 05_forms
    ├── 06_semantic
    └── template.html
```

The worksheet is based on the materials from the HTML lecture and you should refer to the [slide deck](https://goo.gl/DGFkr6) to help your understanding.

Before you start you need to download and new materials. We will be covering git commands in a later worksheet but for now you should use the SSH Terminal execute the following commands from the root directory:

```shell
$ ls
  01 Setup.md                       08 Express Web Server.md
  02 The HTTP Protocol.md           09 Data Persistence.md
  03 Learning HTML5.md              10 Automated Testing.md
  04 Learning CSS3.md               11 Deployment.md
  05 Introduction to JavaScript.md  README.md
  06 Functions and Objects.md       exercises
  07 Version Control.md
$ git add --all
$ git commit -m 'completed http worksheet'
$ git pull origin master
```

## 1 Syntax

Lets take a look at some basic HTML syntax. Start by locating the `exercises/03_html/01_syntax/` directory. Navigate to this using the SSH Terminal, install the `express` package and start the web server. If you navigate to the base route `/` you will see a screen full of text.

![the unformatted text](exercises/.images/chrome_07.png)

As you can see, all the newlines have been replaced by spaces. The default behaviour of the web browser is to replace all newlines with spaces and replace multiple spaces with a single one!

Your job is to add html formatting to the text to make it readable. You should first of all add the basic HTML5 tags and then format the text using:

- Heading tags (levels 1-3).
- Paragraph tags.
- Horizontal rules.
- All date ordinals should use superscript.

As you work, save the html file and refresh the browser, you don't need to restart the `index.js` script. Use the [html validator](https://validator.w3.org/#validate_by_input) to check your work on a regular basis.

## 2 Lists

Now you have mastered the basics of html its time to move on to how it can be used to render lists of different types. Start by locating the files in the `exercises/03_html/02_lists/` directory. Now start the Express server and view the root URL `/`. This should display a simple page with the title **1980's Home Computers**.

Now, add a list on your web page. Insert the following lines of code after the paragraph describing clever uses for home computers:

```html
<p>Some reasons often mentioned were:</p>

<ul>
  <li>learning to write computer programs</li>
  <li>managing family finances</li>
  <li>keeping track of freezer contents</li>
</ul>
```

View the list in the browser.

The `ul` element describes an unordered list. It contains three list items (denoted by `li` elements).

See what happens, when you change the list type to ordered list (`ol`).

Next, try a definition list. Add the following piece of code at the very end of the document, right before the `</article>` end tag:

```html
<p>There are two types of memory:</p>

<dl>
  <dt>RAM</dt>
  <dd>Random access memory. The memory usable by programs. The amount was
  typically in the ballpark of 20 to 64 kilobytes. However, the Basic
  interpreter by default consumed a part of this.</dd>

  <dt>ROM</dt>
  <dd>Read-only memory. This was normally smaller in size than RAM and
  roughly corresponded to the hardware implementation of the operating
  system.</dd>
</dl>
```

The definitions list contains two elements for each item: a `dt` for the term and a `dd` for definition.

### 2.1 Test Your Knowledge

1. Find out about the applications of computers in the 1980s and add two more reasons for people to buy them.
2. Create an _ordered list_ that contains the uses of modern computers in order of importance.
3. Identify five components in a 1980s computer and create a definition list that defines each of these.

## 3 Hypermedia

Now you have mastered the basics of HTML markup we will look at one of the most important features, the ability to link resources together (known as **hypermedia**), this is one of the cornerstones of the World Wide Web (WWW).

### 3.1 Routes

Every resource on the WWW (such as html documents and images) has a unique URL and so when we design our website we need to define these. In a website built using _NodeJS_ and _Express_ these are known as **routes**. Start by locating the `exercises/03_html/02_hypermedia/` directory. Start the web server and opening the `index.js` file.

1. Some resources need to be directly accessible in the web browser (they are accessed either directly or loaded by the html web page). These need to have their own directly accessible URL.
    1. One directory needs to be specified as being publicly available. In this example we have created a directory called `public/`
    2. Express needs to make this directory public. This is achieved on line by inporting a static module and using this to specify the public directory.
    3. assuming the server is running you can directly view the image using the URL `http://xxx:8080/paradox.jpeg`, remembering to substitute your server's URL.
2. Some resources are _virtual_ and are generated by a script running on the server before being sent back to the browser client.
    1. There are some simple examples in `index.js`. Both the `/` and `/paradoxes` routes trigger scripts that take the contents of html files and send this back to the browser.
    2. When you access the `/date` route it displays today's date. Look at the script that does this (you don't need to understand the code details).

#### 3.1.1 Test Your Knowledge

1. There is a file called `coventry_cathedral.jpg` in the `public/` directory. Display this in the browser.
2. Create a route called `/cathedral` which should return the contents of the `cathedral.html` file located in the `html/` directory.
3. Create a route called `/time` that displays the current time in hours and minutes. There is detailed documentation on the [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) function on the Mozilla website.

### 3.2 Hyperlinks

Now you understand the concept of URLs representing resources and how this relates to _routes_, it is time to start linking resources together. With the Express server running access the `/commodore` URL which should display a web page describing the **Commodore 64 home computer**

Add a link to the appropriate Wikipedia article to this web page, in a suitable location directly inside the `body` element:

```html
<p>Read the <a href="http://en.wikipedia.org/wiki/Retrocomputing">Wikipedia article for Retrocomputing</a>.</p>
```

To test the functionality in your browser you will need to make sure the Express server is running and navigate to the correct URL.

A link, defined by `a` element contains the URL of the linked web page as its `href` attribute. The link above contains an absolute path to a document on the external server. The absolute path begins will full protocol identifier and domain name.

Unlike block elements (such as `h1` or `p`), links are inline elements: they always need a block element as a container and they are considered as a running part of the content of the parent block element.

A relative link is intended for links within the same domain. The parsing of the file path starts from the default directory, which is the directory where the containing HTML document is located. For instance:

- `"document.html"` points to a document of that name in the default directory.
- `"info/document.html"` points to a document in `info` subdirectory of the default directory.
- `"../document.html"` points to a document in the parent directory of the default directory. (Note that, for security reasons, web servers prohibit the traversal of server's directory structure outside the dedicated document root folder.)

Add a link or two to suitable places in **computers80.html**.

### Test your understanding

1. Create a relative link between the list item on the home page and the page on the Commodore 64.
2. Add a link at the bottom of the Commodore 64 page called **Back** which returns the user to the home page.
3. Create a file called **spectrum.html** in the `html/` directory with the content shown below correctly marked up as HTML 5.
4. Create a new `/spectrum` route in the `index.js`.
5. Add new link to the list on the home page to send the user to this new page.
6. Make sure there is a link on the Spectrum page to return the user to the home page!
7. Validate your newly-created web page and correct any potential errors.

```
Sinclair ZX Spectrum
  - History
    - The ZX Spectrum is an 8-bit personal home computer released in the United Kingdom in 1982 by Sinclair Research.

  - Current status
    - There's still a wide community of Specrum enthusiasts. There are numerous emulators, such as Fuse (link to http://fuse-emulator.sourceforge.net) and Speccy (link to https://fms.komkon.org/Speccy/).
  - Gaming device
    - Best games
      - The ZX Spectrum was famous for its games. Some of the best include
        - Jet Set Willy
          - contained 60 levels
        - The Hobbit
          - A text adventure game with some simple graphics
  - Back to Main page (link)
```

### 3.3 Images

In HTML5, images are put inside a `figure` element. The `figure` element normally contains one image, possibly with a caption, but technically it can serve as a container for multiple images. because the images are loaded by the HTML web page (and not directly by the web server) they need to be in a publicly accessible directory. On our web server this has been defined as the `public/` directory. You should create subdirectories within this to organise your files.

Locate the `03_hypermedia/public/` directory and create a new folder inside this called `images/`. Find an image of a 1980s computer and drag it into this new directory. You can use the image below if you wish.

![computer](exercises/.images/02_computer.png)

Now,  Add the following lines of code in an appropriate place, directly inside the `body` element, substituting the name of the image you uploaded:

```html
<figure>
  <img src="images/computer.png" alt="A computer with a monitor"/>
  <figcaption>Photo: Piotr Siedlecki, public domain via http://www.publicdomainpictures.net.</figcaption>
</figure>
```

Notice that the path to the image `images/computer.png` does not include the `public/` directory.

There are a couple of notable things about the `img` element:

1. It is a void element. A void element doesn't have any content, and can be closed immediately, like this  `<img >`. For convenience, it can also be closed like this `<img />`. The extra `/` character, in the end, is not essential.  However,  `<img >` must **NOT** be closed like this `<img></img>`, which is a syntax error.

> There are other void elements besides `img`. One of the most widely used is `hr` for creating a horizontal rule and written as `<hr>`. Void elements are not to be confused with self-closing tags. For void elements it's **illegal** to write `<img></img>` or `<hr></hr>`, but for self-closing tags such as `<li>` or `<body>` you can safely ignore closing tags `</li>` or `</body>`.
> Click [here](https://www.w3.org/TR/html-markup/syntax.html) for a comprehensive list of void elements, [here](http://stackoverflow.com/questions/3558119/are-self-closing-tags-valid-in-html5) and [here](http://stackoverflow.com/questions/5641997/is-it-necessary-to-write-head-body-and-html-tags) for discussions on StackOverFlow. [To close or not to close tags](http://blog.teamtreehouse.com/to-close-or-not-to-close-tags-in-html5), that is the question.

2. For an image to be displayed, it requires additional information in the form of attribute/value pairs. The attribute/value pairs above, are given within the start tag in the form of `attribute="value"`. Multiple definitions are separated by space. Two of attribute/value pairs are mandatory for images:

| Attribute | Purpose                                                                                                                                     |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| src       | For locating the image file. The file path is normally given as relative path, starting from the directory where the HTML file is located.  |
| alt       | For displaying an alternative text if the image cannot be displayed, or if the user prefers using a screen reader for accessibility purposes. |

#### 3.3.1 Test Your Knowledge

1. Find photographs of the following computers and upload to the `images/` directory you created:
    1. Sinclair ZX Spectrum
    2. Commodore 64
    3. BBC Model B
2. Make sure you add a `<figcaption>` element that describes the image and where you found it.
3. Make all the images 320px wide without stretching them. You will need to use another attribute, use the [documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) to work out how.

### 3.4 Media

Now we will learn how to embed audio in a website. There are a number of resources located in the `public/` directory that we will add to our `index.html` page.

1. You can use the new html `<audio>` tag to embed audio in a web page without needing to use third-party plugins. You will need to encode your audio files in two different formats for this to work in all major browsers:
    1. Most browsers need files in the `.mp3` format.
    2. Firefox requires files encoded using the `.ogg` format.
2. In a similar way, video can also be embedded:
    1. Most browsers require a video file encoded as `.mp4`.
    2. Firefox needs an `.ogg` encoded version.
3. You can also embed a [YouTube](https://www.youtube.com) video in an `<iframe>` or alternatively using the `<object>` element. This is achieved by clicking on the share button then on the **embed** link that is displayed. You copy the html code into your website.

#### 3.4.1 Test Your Knowledge

1. Add the `guitar` audio file to the `index.html` web page. The file has been provided in the two required formats.
    1. Test that the audio plays in both Firefox and Chrome.
    2. Can you modify the `<audio>` element to make the video auto-play?
2. Add the `coventry` video clip to the `index.html` file, again the file has been provided in both formats (note that you will need to change one of the extensions from `.mp5` to `.mp4`).
    1. Test the video using both Firefox and Chrome.
    2. Restrict the video window to 320px wide without stretching the image.
    3. Are there any additional attributes you can add to the `<video>` element. Try these out, whay effect do they have?
3. Find a (short) video clip on YouTube. This can be on any subject you wish.
    1. Embed this in your web page using the _iFrame_ code provided by Google.
    2. Examine the attributes used and try changing their values, noting the effect this has on the embedded video.
    3. Now embed the same clip using the _Object_ code.
    4. Examine the attributes used and try changing their values, noting the effect this has on the embedded video.

## 4 Tables

This task focuses on HTML tables. You will be working on the files in the `exercises/03_html/04_tables/` directory. Start the web server.

Open the root path `/` which should display a table comparing a number of home computers from the 1980s. Examine the script `index.js` to locate the html file being loaded and open up this file in the editor.

Verify that you understand the elements used in marking up the table:

- `<table>` to indicate the entire table.
- `<caption>` for specifying the header of the table. By default, it appears above the table centered.
- `<thead>` and `<tbody>` are semantic elements to  show the header and body parts of the tables (there´s also `<tfoot>` for the footer). These are semantical elements, and, while not necessary, can help figuring out the structure of the table. In addition, `<tfoot>` could be used for a footer row.
- `<tr>` for a table row. You can add as many of these elements into the table as necessary. Inside each `<tr>`, put a necessary number of `<th>`/`<td>` elements (see below)
- `<th>` for a header cell. Inside the `<tr>` element corresponding to the header row (usually the topmost row), each column heading is given using this element.
- `<td>` for a table data cell, i.e. regular table cell.

> A summary of all HTML table tags can be found [here](http://www.w3schools.com/html/html_tables.asp).

### 4.1 Test your understanding

1. Modify the table structure to contain a column for Spectravideo home computer. Its data is: Spectravideo SV-328, Zilog Z80A CPU, 64kB RAM, 32kB ROM.
2. Generate two additional rows where each row should have a multi-column cell (use `colspan` attribute):
    - Main usage: home computing (for all computers, a single cell should span over four columns)
    - Killer game: Jet Set Willy (for Commodore 64 and ZX Spectrum, in a merged cell covering two columns), Jelly Monsters (for VIC-20), and  Armoured Assault for Spectravideo.

## 5 Forms

In this final part of the worksheet you will be building forms that can send data to a web server.

### 5.1 POST vs GET

Lets start by looking at how forms send data to the server. This can be done using the HTTP `GET` method or using the `POST` method. Lets try out both so we can understand the differences.

#### 5.1.1 Submitting Data Using POST

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

#### 5.1.2 Submitting Data Using GET

Make sure the web server us running and access the `/getform` route and open the corresponding html file.

1. Complete the form with your name.
2. Click on the the **Submit** button.
3. Examine the URL carefully:
    1. Notice that it contains 2 query parameters in a querystring.
    2. The names of the query parameters correspond to the values in the `name` attributes in the `<input>` elements.
4. Open the _Chrome developer tools_ and look at the _http request_:
    1. Notice that the request uses the `GET` method. This corresponds to the `method` attribute in the `<form>` element.
    2. The URL contains the data (remember there is only a request _body_ when the `POST` method is used.

### 5.2 Form Controls

In the previous section the form used the `<input>` element which displayed simple text boxes where you could enter anything. In this section you are going to learn about how to use a wide range of different controls to capture user input.

#### 5.2.1 Input Elements

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

### Hidden parameters

Sometimes we need a way to submit some additional parameter to the server. This can be done by using a `hidden` input parameter.
A hidden parameter has no onscreen appearance, but it will be sent to the server.

```html
<form>
......
    <input type="hidden" name="org" value="Acme" />
    ....
</form>
```

#### 5.2.2 Lists

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

#### 5.2.3 Test Your Understanding

1. Create a new route in the `index.js` file called `/register`.
2. Create an html file called `registerform.html`.
3. Create an html form that `POST`s its data to `/`.
4. Create a registration form using all of the different form controls you have seen.
5. Make sure you understand the data displayed when the form is posted.
6. Change the form so it makes a `GET` request.

### 5.3 Labelling Forms

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

### Use grouping and hints

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

#### 5.3.1 Test Your Understanding

Make sure the web server is running and access the `/semantic` route. Open the html file containing the form that is being diplayed.

1. At the moment, you have to click exactly the right spot on your checkboxes etc. Change this by using labels.
2. Rearrange your form with legends and fieldsets in order to make it easier for the user to understand.
3. Give input hints to the user whenever possible.

### 5.4 Form Validation

Form validation is traditionally done using JavaScript. But HTML5 introduces some new ways of doing it, which makes validation a lot easier.

#### 5.4.1 'required' attribute

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

#### 5.4.2 'pattern' attribute based on regular expression

In addition to using different input types, we can also use patterns a.k.a.regular expressions. Using patterns, we can validate user inputs even more precisely.

Pattern is an encoded sequence of characters that define a pattern of text characters. Remember that client-side validation is not reliable as the only means of validation, it is useful to make the user interface more pleasant.

For example, a Finnish social security number (similar to UK National Insurance number) is often 999999-999X (for those who are born in the 20th century). The first 6 digits are the birth date: day, month and year's last two numbers. After "-" there are 3 digits and the last character can be either digit or letter from A to Y. If we want to make a pattern of this, it would be

```html
<input type="text" pattern="\d{6}\-\d{3}([0-9A-Y])" ...>
```

\d means a digit, \\- means the "-", [chars] means a set of characters.

### 5.4.3 Test your understanding

Open file **form-skel.html**. Validate the user's data in Student id, email address and score by using patterns.

## 6 Semantic Markup

In this final exercise we will look at how [MicroData](https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata) can be used to add semantic information to a web page. Start by using the SSH Terminal to run the server in the `exercises/03_html/06_semantic/` directory and navigating to the base route `/`. This should display a simple review page.

1. Paste the URL into the [Rich Snippets Tool](http://www.google.com/webmasters/tools/richsnippets) to see what semantic data it contains. Notice:
    1. There are two **items** on in the webpage, a movie and a rating. These are defined using the `itemscope` attribute in the html. Each item has an `itemtype` attribute that points to the appropriate Microdata definition.
    2. Within each `itemscope`, the information has been tagged using the `itemprop` attribute. The allowed values are defined by the `itemtype` definition available on the [Schema.org website](http://schema.org/docs/full.html).
    3. The schema definitions define what `itemtype` are allowed and also what items can be nested inside which items.
2. The [Rich Snippets Tool](http://www.google.com/webmasters/tools/richsnippets) will not only extract the metadata but will also identify any errors in your implementation of the MicroData schema.
3. Install the [Structured Data Testing Tool Plugin](https://chrome.google.com/webstore/detail/structured-data-testing-t/kfdjeigpgagildmolfanniafmplnplpl/related?hl=en) for your Chrome Browser and use it to see the metadata.

### 6.1 Test Your Understanding

The `/cafe` route displays information about a local cafe. Using the [CafeOrCoffeeShop](http://schema.org/CafeOrCoffeeShop) schema as a starting point, add semantic markup. Feel free to add additional content to practice your skills.
