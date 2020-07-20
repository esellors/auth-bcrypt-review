require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const app = express();
const aCTRL = require('./controllers/auth');
const pCTRL = require('./controllers/puppy');
const admCTRL = require('./controllers/admin');
const verify = require('./middlewares/auth/verify');

const { SERVER_PORT, DB_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

massive({
	connectionString: DB_STRING,
	ssl: { rejectUnauthorized: false }
}).then(db => {
    console.log('db connected');
    app.set('db', db);
});

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52
    }
}));

// unprotected routes
app.get('/api/puppies', pCTRL.getPuppies);

app.post('/auth/signup', aCTRL.signup);
app.post('/auth/signin', aCTRL.signin);
app.post('/auth/signout', aCTRL.signout);

// protected routes - must be a user
app.use(verify.user);

app.post('/api/puppies', pCTRL.addPuppy);

// protected routes - must be a user, must be an admin
app.get('/admin/users', verify.admin, admCTRL.getUsers);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${ SERVER_PORT }`));