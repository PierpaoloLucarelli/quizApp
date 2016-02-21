var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connect("mongodb://localhost/questions");

// // define Schemas


//questions
var questions = mongoose.model("questions", new Schema({
	body: 			String,
	option1: 		String,
	option2: 		String,
	option3: 		String,
	answer: 		String	
}), "quest");


//users
var user = mongoose.model("users", new Schema({
	email: 			{type: String, unique: true, required: true, dropDups: true},
	username: 		{type: String, unique: true, required: true},
	password: 		{type: String, required: true},
	scores: 		[]
}), "users");



//export to app.js
module.exports.questions = questions;
module.exports.user = user;




