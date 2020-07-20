## Review of adding auth server side using node.js, bcryptjs, express-session, middlewares
## This is the skeleton of the review
### Class will code/watch while I code solutions

+++BCRYPT/SESSION+++
+REGISTERING (handler function)
-Get info from the user if we don't have it yet (username/email & password, etc)
-Verify no existing user exists
-Protect the password w/ hashing
-Store info: add new user to DB
-Use info: create a session
-Send response (session object, other, 200)

+LOGGING IN (handler function)
-Get info from the user if we don't have it yet (username/email & password, etc)
-Verify existing user exists & grab its info
-Compare hashes (hashed password w/ DB hash)
-Use info: create a session
-Send response (session object, other, 200)

+LOGGING OUT
-Killing the session logs the user out
-Straight-forward with destroy()

(for the purposes of this review, we are not going into editing user info)

+++MIDDLEWARES+++
+PROTECTING ROUTES (top and/or route level middleware)
-Create functions that check for conditions in order to move forward
-If not met, send back 403
-If met, continue past function
-These middleware functions can be created inline or stored in their own files to import from
