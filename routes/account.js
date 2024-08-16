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
/*
router.get("/countrycode", async function (req, res) {
	countryCount = await sql`SELECT MAX("CountryID") FROM "Countries"`;
	res.status(200).json({message: countryCount[0].max});
})
*/

/*
router.get("/origincheck", async function (req, res) {
	origin_tables = await sql`SELECT STRING_AGG(COLUMN_NAME, ',')
		AS COLUMNS
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE TABLE_NAME = 'Origin'`;
	origin_tables = origin_tables[0].columns.split(',');
	res.status(200).json({origin_tables});
}); 

router.get("/countrysearchcheck", async function (req, res) {
    search = await queries.Search("Countries", ["Australia"]);
	res.status(200).json({search});
});

router.get("/countryinsertcheck", async function (req, res) {
    search = await queries.Insert("Origin", ["OriginID", "CountryID", 
        "Origin_of_Imported_Products", "Australian_Made",
        "Product_of_Australia", "SME", "Aboriginal_TorresStraitIslander_Content",
        "Recycled_Content"], 
        ["2", "1", "AU", "Bu", "Y", "SMH", "N", "Y"]);
    res.status(200).json({search});
});

router.get("/furnitureinsertcheck", async function (req, res) {
    search = await queries.Insert("Furniture", await queries.GetColumns("Furniture"), 
        ["6", "1", "1", "1", "2", "Good", "Even Gooder", "12", "13",
        "UPIC", "1", "1", "1", "1", "1"]);
    res.status(200).json({search});
});


router.get("/categorycheck", async function (req, res) {
    search = await queries.Insert("Category2", ["Category_2ID",
        "Category_2Name", "Category_2Description", "CategoryID"],
        ["2", "Bro", "Bro", "1"]);
    res.status(200).json({search});
});

router.get("/getcolumnscheck", async function (req, res) {
    search = await queries.GetColumns("Category4");
    res.status(200).json({search});
})
*/
module.exports = router;

