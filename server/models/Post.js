const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	url: {
		type: String,
	},
	status: {
		type: String,
		enum: ["TO LEARN", "LEARNING", "LEARNED"],
	},
	user: {
		type: schema.Types.ObjectId,
		ref: "users",
	},
});

module.exports = mongoose.model("post", postSchema);
