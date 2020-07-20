module.exports = {
    getUsers: async (req, res) => {
        const db = req.app.get('db');
        
        const users = await db.admin.get_users();
        
        res.status(200).send(users);
    }
}