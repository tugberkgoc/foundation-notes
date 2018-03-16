
# Client-Side JavaScript

Up until now all your scripts have run on the server however you can run JavaScript in the web browser as well. The good news is that you can use the same JavaScript syntax in both however there are a few key differences:

1. You can't connect to any resources on the server such as databases (however you can use the database built into the web browser).
2. One of the most important applications is interacting with the browser by using the `document` object.

## 1 The Document Object Model

The key to interacting with the web page is the `document` object. This contains the entire web page.

As the user interacts with the web page they trigger different events and these can be used to run JavaScript code.

`dom/` directory.

## 2 Lists

`lists/` directory.

## 3 Making Async Web Requests

`books/` directory.

## 4 Creating a Single Page Application



## 5 Web Storage

Only supports strings. Need to convert objects to json strings.

Local storage: Stores data with no expiration date. The data will be available even when the browser/ browsing tab is closed or reopened.

Session storage: Stores data for one session. Data persisted will be cleared as soon as the user closes the browser.

-----

async

defer