
# Code Quality

In this worksheet you will be applying a range of techniques to improve the quality of your code.

## 1 Modularisation

The first step you will need to do is to split your code up to make it easier to understand. Take a look at the end of the `index.js` routes file.

Start by updating your routes file by copying over the `modules/accounts.js` file from the lab materials and making sure you import it into your `index.js` file by adding the following statement just below where all the other modules are imported:

```javascript
const accounts = require('modules/accounts')
```

This loads the module into a constant called `accounts`.

Now locate the second `router.post('/login')` route (this is currently commented out). Comment out the one you have been using and uncomment this new shorter version. If you run your server and test it you will find the functionality is identical. Its time to understand how this new version works:

1. We start by storing the `request.body` data (the HTTP POST request body data) in an immutable variable called `body`.
2. Next we call the `checkCredentials()` function that we imported from the `accounts.js` module passing the username and password as parameters.
3. If this function does not throw an exception it means the credentials are valid so we set the cookie and redirect to the home page.
4. If either the username or password are invalid, the `checkCredentials()` function will throw an exception which will be handled by the `catch()` block. The error message will explain what us wrong so we pass this back to the login page.

Now we need to look at the `accounts.js` module. This implements some very important concepts that you will need to understand and apply to your assignment.

1. 

### 1.1 Test Your Understanding

To check you understand how to use modules you are now expected to move more of the functionality from the `index.js` file into this separate module. To help you with this you will find stub functions that only require the functionality to be added! You will be modifying the functions below the `/* --- STUB FUNCTIONS --- */` line.

1. Implement the `checkNoDuplicateUsername(username)` function to comply with the JSDoc comments, it should throw an exception if a duplicate user is found or `true` if not.
2. Implement the `saveImage()` function. This should check that the image is of the correct type then save it to the `avatars/` directory.
3. Now implement the `addUser()` function. This should make use of the functions you created in the first two tasks. It should check for duplicates before saving the image then it should encrypting the password and then saving the new record.
4. The final step is to comment out the `router.post('register')` route in `index.js` then create a replacement that makes use of the functions you added to the `accounts.js` module.

Now much of the business logic has been moved to the separate module, are there any module imports in `index.js` that are no longer needed? Locate these and delete.

## 2 Linting

When using a language as flexible as JavaScript which contains so many legal (but terrible) features, it is important to use a linter. This will check your code against a set of rules. These ensure:

1. You are not using what are considered bad language features.
2. You are implementing optional syntax (such as indentation and semicolons) in a consistent manner.
3. You are writing code that is easy to maintain.

If you look over both your `index.js` and `accounts.js` files you should be feeling pretty comfortable that you are already writing clean, consistent and maintainable code, lets see how good your code really is!

You should start by ensuring you have installed `eslint` which is considered the industry standard and that you have a copy of the approved configuration file `.eslintrc.json` in the root directory of your project. You can find this in the `TEACHING-MATERIALS` repository but make sure you take a copy of the latest version from the master repository!

Try running the linter on your `index.js` routes file:

```shell
$ node_modules/.bin/eslint index.js
```

You will see a list of issues that the linter has flagged in your code. Notice that some of these are flagged as errors (serious) and some as warnings (recommendations). Each message includes:

1. The line and comumn number where the error was found.
2. A description of the error.
3. The rule that is being broken.

The latter can be used to quickly look up the rules in the [comprehensive documentation](https://eslint.org/docs/rules/).

Instead of running separate checks on every file, we can specify the directory we want to check and it will automatically scan all the subdirectories. For example to scan all the files in the `modules/` directory we could run:

```shell
$ node_modules/.bin/eslint modules/
```

### 2.1 Test Your Understanding

1. How could you run the linter to scan _all_ the files in your project (HINT: you need to start scanning in the _current directory_)?
2. Now you should locate and fix all the errors and warnings in your code.
3. If you are using VS Code, install `eslint` globally and then install the [eslint extension](https://github.com/Microsoft/vscode-eslint). After restarting your editor you should see any errors and warnings flagged in the editor.

## 3 Documentation

In this third and last topic we will be using the [JSDoc](http://usejsdoc.org) tool to build a detailed code documentation website by extracting special comments inserted into our source code.

The default set of documentation tools provided in JSDoc are not suitable for documenting Koa routes and so we will be using a plugin called [jsdoc-route-plugin](https://www.npmjs.com/package/jsdoc-route-plugin). This should have been installed by the package manifest however you should check that you are using the current version of the `package.json` file and update if needed, rerunning the `npm install` command to ensure all packages are installed. You should also check that you have the latest version of the `jsdoc.conf` configuration file.

Now everything is installed we can run the `jsdoc` tool to generate our documentation.

```shell
$ node_modules/.bin/jsdoc
```

If you run this command you should see a new directory called `docs/` which will contain a `jsdoc/` directory. Inside this you will see some website files, opening the `index.html` file in your browser you should see the documentation pages for your website!

### 3.1 Test Your Understanding

You will probably have noticed that only a couple of the functions include complete JSDoc comments and so the documentation website is incomplete. Your task is to use the existing comments for guidance and complete the task of documenting your code. You will find the [JSDoc](http://usejsdoc.org) and [jsdoc-route-plugin](https://www.npmjs.com/package/jsdoc-route-plugin) documentation helpful.
