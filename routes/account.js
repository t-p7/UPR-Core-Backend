var express = require('express');
var router = express.Router();

router.get("/login", async function (req, res) {

	const username = req.body.username;
	const password = req.body.password; 
	var valid_login = await sql`SELECT ID FROM Accounts WHERE Username = ${username} AND Password = ${password}`;
	valid_login = valid_login[0];

	if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
		res.status(403);
		res.json({message: "No username or password specified"});
	}

	else if (valid_login == null || valid_login == "") {
		res.status(404);
		res.json({message: "User not found"});
	}

	else {
		res.status(200);
		res.json({message: "Successful login"});
	}
})

module.exports = router;