module.exports = {
    getPuppies: async (req, res) => {
        const db = req.app.get('db');
        let puppies;

        try {
            puppies = await db.puppy.get_all();
            res.status(200).send(puppies);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    addPuppy: async (req, res) => {
        const db = req.app.get('db');
        let puppies;
        const puppygram_user_id = 1; // temporary until we get req.session in use

        try {
            puppies = await db.puppy.add_one({...req.body, puppygram_user_id});
        } catch (error) {
            return res.status(500).send(error);
        }

        res.status(200).send(puppies);
    }
}