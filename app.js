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
	db.uploadQuestion("req, res");
});

app.post("/login", function(req,res){
	res.send(req.body);
});

app.get("/login", function(req,res){
	res.render("login.jade");
});

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

app.get("/example", function(req,res){
	res.render("index.jade");
})


app.listen(3000);