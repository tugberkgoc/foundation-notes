
# The Express Web Server

In the previous worksheet you learned the basics of the JavaScript language. In this worksheet you will be applying these skills to understand how to use the NodeJS Express module to host a dynamic website. It is vitally important that you have completed all the exercises in the previous worksheet before continuing.

By the end of this worksheet you will be able to build simply dynamic websites using Express.

Contents:

1. Package Manifests
2. Routes
3. Request and response objects
4. Templating
5. Modular code

## 1 Package Manifests

## 2 Routing

### 2.1 Routes

use the todo/ example

### 2.2 The Request Object

```javascript
req.query // querystring object
req.body
req.hostname
req.baseUrl
req.path
req.ip
req.params // /xxx/:yyy
```

req.body Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser

req.query This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.

req.accepts(types) Checks if the specified content types are acceptable, based on the request’s Accept HTTP header field. The method returns the best match, or if none of the specified content types is acceptable, returns false (in which case, the application should respond with 406 "Not Acceptable"). req.accepts('html')

req.get(field) Returns the specified HTTP request header field (case-insensitive match). The Referrer and Referer fields are interchangeable. req.get('Content-Type')

### 2.3 The Response Object

```javascript
res.write()
res.send()
res.setHeader('content-type', 'text/html')
res.sendFile(`${__dirname}/form.html`)
res.end()
```

currency/ example

## 3 Templating

Up to now you have seen two ways the server can send response data to the client web browser:

1. Sending the contents of an HTML file. This is great for complex web pages but you can't include dynamic data.
2. Using the `res.write()` and `res.send()` to send dynamic data. The limitation is that its quite clunky and would be completely inpractical for complex web pages.

In this section you will be introduced to a third approach which combines the best features of each the other two approaches. Locate the files in the `exercises/06_express/template/` directory.

use the template/ example.

## 4 Modular Code

books/ example

1. CommonJS modules
2. Handling callbacks in modules
