var express = require('express');
var router = express.Router();

router.get("/login", async function (req, res) {

	if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
		res.status(403);
		res.json({message: "No username or password specified"});
	}

	else {
		var username = req.body.username;
		var password = req.body.password; 
		var valid_login = await sql`SELECT ID FROM "Accounts" WHERE "Username" = ${username} AND "Password" = ${password}`;
	
		if (valid_login == null || valid_login == "") {
			res.status(404);
			res.json({message: "User not found"});
		}
	
		else {
			res.status(200);
			res.json({message: "Successful login"});
		}
	}

	
})


router.get("/testlogin", async function (req, res) {
	var accounts = await sql`SELECT * FROM "Accounts"`;
	res.json({accounts}) 
})

module.exports = router;