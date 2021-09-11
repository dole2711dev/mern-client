const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const verifyToken = require("../middleware/auth");

// @route GET api/auth/
// @desc Check if user is login
// @access PRIVATE
router.get("/", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User not found",
			});
		}

		res.json({
			success: true,
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

// @route POST api/auth/register
// @desc Register user
// @access PUBLIC
router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	// Validate data
	if (!username || !password) {
		return res
			.status(400)
			.json({ success: false, message: "Data invalid" });
	}

	try {
		// Check for existing user
		const isExist = await User.findOne({ username });
		if (isExist) {
			return res.status(400).json({
				success: false,
				message: "Username alreadly taken",
			});
		}

		// Create user data
		const hashPassword = await argon2.hash(password);
		const newUser = new User({
			username,
			password: hashPassword,
		});
		await newUser.save();

		// Return token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		);

		res.json({
			success: true,
			message: "User created successfully",
			accessToken,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

// @route GET api/auth/login
// @desc User login
// @access PUBLIC
router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	// Validate data
	if (!username || !password) {
		return res
			.status(400)
			.json({ success: false, message: "Data invalid" });
	}

	try {
		// Check user exist
		const user = await User.findOne({ username });
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User is not exist" });
		}

		// check user & password incorrect
		const passwordValid = await argon2.verify(user.password, password);
		if (!passwordValid) {
			return res.status(400).json({
				success: false,
				message: "Username or password invalid",
			});
		}

		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		);

		res.json({
			success: true,
			message: "Logged in successfully",
			accessToken,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

// @route DELETE api/auth/
// @desc Delete user
// @access PRIVATE
router.delete("/:id", verifyToken, async (req, res) => {
	try {
		const conditionDelete = { _id: req.params.id };
		const response = await User.findOneAndDelete(conditionDelete);

		res.json({
			success: true,
			message: "User has been deleted",
			response,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

module.exports = router;
