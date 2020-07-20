require('dotenv').config();
const express = require('express');
const massive = require('massive');
const app = express();
const aCTRL = require('./controllers/auth');
const pCTRL = require('./controllers/puppy');
const admCTRL = require('./controllers/admin');

const { SERVER_PORT, DB_STRING } = process.env;

app.use(express.json());

massive({
	connectionString: DB_STRING,
	ssl: { rejectUnauthorized: false }
}).then(db => {
    console.log('db connected');
    app.set('db', db);
});

// unprotected routes
app.get('/api/puppies', pCTRL.getPuppies);

app.post('/auth/signup', aCTRL.signup);
app.post('/auth/signin', aCTRL.signin);
app.post('/auth/signout', aCTRL.signout);

// protected routes - must be a user

app.post('/api/puppies', pCTRL.addPuppy);

// protected routes - must be a user, must be an admin
app.get('/admin/users', admCTRL.getUsers);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${ SERVER_PORT }`));