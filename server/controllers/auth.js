const bcrypt = require('bcryptjs');

module.exports = {
    signup: async (req, res) => {
        // bring in the info we need
            // get instance of db
        const db = req.app.get('db');
            // get info from req.body
        const { username, password, is_admin } = req.body;

        // check if username is not already taken
        const foundUser = await db.auth.check_user({ username });
        if (foundUser[0]) return res.status(406).send('Try another username');

        // create password hash
        const hash = await bcrypt.hash(password, 10);

        // now that we have verified info and hashed password, send to db as new user and get user id that is created
        const newUser = await db.auth.add_user({ username, hash, is_admin })
        delete newUser[0].hash;

        // log user in by creating session
        req.session.user = { ...newUser[0] };

        // send session info in response so front end can decide how to use it (what to send and how to use the response depends on our app purpose)
        res.status(200).send(req.session.user);
    },
    signin: async (req, res) => {
        // bring in the info we need
            // get instance of db
        const db = req.app.get('db');
            // get info from req.body
        const { username, password } = req.body;

        // get info for given username from db so we can eventually compare hashes and create session
        const foundUser = await db.auth.check_user({ username });
        if (!foundUser[0]) return res.status(403).send('Username/Password incorrect');

        // compare hashes
        const verified = await bcrypt.compare(password, foundUser[0].hash)
        if (!verified) return res.status(403).send('Username/Password incorrect');

        // log user in by creating session.
        // NOTE: typically the sign in session object should be set up the same as the register session object
        delete foundUser[0].hash;
        req.session.user = { ...foundUser[0] };

        // send session info in response so front end can decide how to use it (what to send and how to use the response depends on our app purpose).

        res.status(200).send(req.session.user);
    },
    signout: (req, res) => {
        // we don't need any info to end a session, so we expect nothing from the body or as a param/query & can just destroy the session
        // NOTE: your app or other apps may be coded to expect something depending on the needs of the app
        req.session.destroy();

        // so we don't leave the front hanging, let's send a response saying everything is good
        res.sendStatus(200);
    }
}