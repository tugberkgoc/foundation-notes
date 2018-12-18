
# Authentication

1. Sessions and Cookies
2. HTTPS (self signing)
3. Sending emails (mailing lists and unsubscribe), the law (nodemailer).
4. Account verification 
5. Password reset

## Sessions and Cookies

Authentication vs Authorisation (have ordinary and admin users).

## HTTPS and Self Signed Certificates

## Sending Emails

Message board that sends daily digests. Include an unsubscribe link.

## Account Verification

https://stackoverflow.com/questions/39092822/how-to-do-confirm-email-address-with-express-node

1. Your User model should have an active attribute that is false by default
2. When the user submits a valid signup form, create a new User (who's active will be false initially)
3. Create a random hash and store it in your database with a reference to the User ID
4. Send an email to the supplied email address with the hash as part of a link pointing back to a route on your server
5. When a user clicks the link and hits your route, check for the hash passed in the URL
6. If the hash exists in the database, get the related user and set their active property to true
Delete the hash from the database, it is no longer needed.

## Password Reset

http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/