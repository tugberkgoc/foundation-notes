
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
