var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connect("mongodb://localhost/questions");

// // define Schemas
// connect to quest collection
var questions = mongoose.model("questions", new Schema({
	quest_id: 		Number,
	body: 			String,
	option1: 		String,
	option2: 		String,
	option3: 		String,
	answer: 		String	
}), "quest");

var user = mongoose.model("users", new Schema({
	email: 			String,
	password: 		String,
}), "users");



// var questions = mongoose.model("quest", question);
// var users = mongoose.model("users", user);

module.exports.questions = questions;
module.exports.userr = user;




