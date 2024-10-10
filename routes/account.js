var express = require('express');
var router = express.Router();
const sql = require('../db'); // Adjust the path as necessary
const queries = require('./middleware/queries');
const Table = require('./middleware/tables');

router.post("/login", async function (req, res) {
    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
        res.status(403).json({ message: "No username or password specified" });
    } else {
        const { username, password } = req.body;

        try {
            const result = await sql`
                SELECT "ID" 
                FROM "Accounts" 
                WHERE "Username" = '${sql.unsafe(username)}' AND "Password" = '${sql.unsafe(password)}';
            `;

            if (result.length === 0) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json({ message: "Successful login" });
            }
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
module.exports = router;

