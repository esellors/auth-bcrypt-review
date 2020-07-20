module.exports = {
    signup: (req, res) => {
        // bring in the info we need
            // get instance of db

            // get info from req.body

        // check if username is not already taken


        // create password hash


        // now that we have verified info and hashed password, send to db as new user and get user id that is created

        
        // log user in by creating session


        // send session info in response so front end can decide how to use it (what to send and how to use the response depends on our app purpose)

        console.log('hit signup')

    },
    signin: (req, res) => {
        // bring in the info we need
            // get instance of db

            // get info from req.body

        // get info for given username from db so we can eventually compare hashes and create session


        // compare hashes


        // log user in by creating session.
        // NOTE: typically the sign in session object should be set up the same as the register session object


        // send session info in response so front end can decide how to use it (what to send and how to use the response depends on our app purpose).

        console.log('hit signin')

    },
    signout: (req, res) => {
        // we don't need any info to end a session, so we expect nothing from the body or as a param/query & can just destroy the session
        // NOTE: your app or other apps may be coded to expect something depending on the needs of the app


        // so we don't leave the front hanging, let's send a response saying everything is good

        console.log('hit signout')

    }
}