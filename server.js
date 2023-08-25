// database = yoga_app;
//tables = users (email, hashed_password)
//        = favorite_poses (id, user_email, pose_name, date)

const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8000;

// user signup
app.post("/signup", async (req, res) => {
	const { email, password } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const hashed_password = bcrypt.hashSync(password, salt);
	try {
		// save the user email + hashed password to the database
		const signUp = await pool.query(
			"INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
			[email, hashed_password]
		);
		// return success response
		const token = jwt.sign({ email }, "secret", { expiresIn: "1d" });
		res.json({ email, token });
	} catch (err) {
		console.log(err);
		if (err) {
			res.status(500).json({ detail: err.detail });
		}
	}
});

// user login
app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const users = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);
		if (!users.rows.length)
			return res.json({ detail: "User does not exist" });

		const success = await bcrypt.compare(
			password,
			users.rows[0].hashed_password
		);
		const token = jwt.sign({ email }, "secret", { expiresIn: "1d" });

		if (success) {
			res.json({ email: users.rows[0].email, token });
		} else {
			res.json({
				detail: "Login Failed. Please try a different password",
			});
		}
	} catch (err) {
		console.log(err);
	}
});

//GET ALL FAVORITES
app.get("/favorite_poses/:userEmail", async (req, res) => {
	const { userEmail } = req.params;
	console.log(userEmail);
	try {
		const favorite_poses = await pool.query(
			"SELECT * FROM favorite_poses WHERE user_email =$1",
			[userEmail]
		);
		res.json(favorite_poses.rows);
	} catch (err) {
		console.log(err);
	}
});

// POST A FAVORITE
app.post("/favorite_poses", async (req, res) => {
	// passing below into the request
	const { user_email, pose_name, date } = req.body;
	// calling uuidv4 to generate a random id
	const id = uuidv4();
	try {
		await pool.query(
			"INSERT INTO favorite_poses (id, user_email, pose_name, date) VALUES ($1, $2, $3, $4)",
			[id, user_email, pose_name, date]
		);
		res.status(201).json({ message: "Created" });
	} catch (err) {
		res.status(500).json({ detail: "Failed to add favorite pose" });
	}
});

// REMOVE A FAVORITE
app.delete("/favorite_poses/:userEmail/:pose_name", async (req, res) => {
	const { userEmail, pose_name } = req.params;
	try {
		await pool.query(
			"DELETE FROM favorite_poses WHERE user_email = $1 AND pose_name = $2",
			[userEmail, pose_name]
		);
		res.status(200).json({ message: "Deleted" });
	} catch (err) {
		res.status(500).json({ detail: "Failed to delete favorite pose" });
	}
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
