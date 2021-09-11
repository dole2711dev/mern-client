const express = require("express");
const router = express.Router();
const verifytoken = require("../middleware/auth");

const Post = require("../models/Post");

// #route GET /api/posts
// #desc Get post
// #access PRIVATE
router.get("/", verifytoken, async (req, res) => {
	try {
		const posts = await Post.find({ user: req.userId }).populate("user", [
			"username",
		]);
		res.json({
			success: true,
			posts,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

// #route POST /api/posts
// #desc Create post
// #access PRIVATE
router.post("/", verifytoken, async (rep, res) => {
	const { title, description, url, status } = rep.body;

	// Validation data
	if (!title) {
		res.status(400).json({
			success: false,
			message: "Title is required",
		});
	}

	try {
		const newPost = new Post({
			title,
			description,
			url: url.startsWith(`https://`) ? url : `https://${url}`,
			status: status || "TO LEARN",
			user: rep.userId,
		});

		await newPost.save();

		res.json({ success: true, message: "Post success", post: newPost });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

// #route PUT /api/posts
// #desc Update post
// #access PRIVATE
router.put("/:id", verifytoken, async (req, res) => {
	const { title, description, url, status } = req.body;

	// Validation data
	if (!title) {
		res.status(400).json({
			success: false,
			message: "Title is required",
		});
	}

	try {
		let dataUpdatedPost = {
			title,
			description,
			url: url.startsWith(`https://`) ? url : `https://${url}`,
			status: status || "TO LEARN",
		};

		const conditionUpdate = { _id: req.params.id, user: req.userId };
		const updatedPost = await Post.findOneAndUpdate(
			conditionUpdate,
			dataUpdatedPost,
			{ new: true, useFindAndModify: false }
		).populate("user", ["username"]);

		// User not authorised to update or post not found
		if (!updatedPost) {
			return res.status(401).json({
				success: false,
				message: "Post not found or user not authorised",
			});
		}

		res.json({
			success: true,
			message: "Updated successfully",
			updatedPost,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

// #route DELETE /api/posts
// #desc Delete post
// #access PRIVATE
router.delete("/:id", verifytoken, async (req, res) => {
	try {
		const conditionDelete = { _id: req.params.id, user: req.userId };
		const postDelete = await Post.findOneAndDelete(conditionDelete);

		// User not authorised or post not found
		if (!postDelete) {
			return res.status(401).json({
				success: false,
				message: "Post not found or user not authorised",
			});
		}

		res.json({
			success: true,
			message: "Delete post item successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(403).json({
			success: false,
			message: "Internal server error",
		});
	}
});

module.exports = router;
