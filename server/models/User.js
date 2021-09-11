const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("users", UserSchema);
