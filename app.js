var express = require("express");
var bodyParser = require("body-parser");
var app = express();
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;
var db = require("./db_connect.js");

//lenght of the question db
var db_length =1 ;

app.use(bodyParser.urlencoded({extended: true}));

// var questions = mongoose.model("questions", new Schema({
// 	quest_id: Number,
// 	body: String,
// 	option1: String,
// 	option2: String,
// 	option3: String,
// 	answer: String
// }), "quest");

app.set('view engine', 'jade');

app.use("/static", express.static(__dirname + '/public'));

// mongoose.connect("mongodb://localhost/questions");


//get the form for the new question
app.post("/upload", function(req,res){
	var quest = new questions({
		quest_id: req.body.quest_id,
		body: req.body.body,
		option1: req.body.option1,
		option2: req.body.option2,
		option3: req.body.option3,
		answer: req.body.answer
	});

	quest.save(function(err){
		if(err){
			var err = "something bad happended";
		} else {
			res.redirect("/");
		}

	})
})

app.get("/upload", function(req,res){
	// db.getQuestions();
	res.render("insert.jade");
})

app.get("/", function(req, res){
	db.getQuestions(req, res);
})

app.get("/next", function(req,res){
	res.redirect("/");
})


app.listen(3000);