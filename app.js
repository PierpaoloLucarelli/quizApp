var express = require("express");
var bodyParser = require("body-parser");
var sessions = require("client-sessions");
var app = express();

// ---------------------------

var db = require("./db_questions.js");
var users = require("./users.js");

//-----------------------------

app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine', 'jade');

app.use("/static", express.static(__dirname + '/public'));

app.use(sessions({
	cookieName: 'session',
	secret: 'xzjhgzxcjhgzxcjhg882hg2jhg2GG',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
}));


//get the form for the new question
app.post("/upload", function(req,res){
	db.uploadQuestion(req, res);
});

app.post("/register", function(req,res){
	users.saveUser(req,res);
});

app.get("/register", function(req,res){
	res.render("register.jade");
});

app.get("/login", function(req,res){
	res.render("login.jade");
});

app.post("/login", function(req,res){
	users.verifyUser(req,res);
});

app.get("/upload", function(req,res){
	res.render("insert.jade");
});

app.get("/dashboard", function(req, res){
	console.log(users.checkSession(req,res));
	if(users.checkSession(req,res)){
		db.getQuestions(res);
	} else {
		console.log(users.checkSession(req,res));
		res.redirect("/login");
	}
});

app.get("/next", function(req,res){
	res.redirect("/");
});

app.get("/example", function(req,res){
	res.render("index.jade");
});

app.get("/", function(req,res){
	res.render("index.jade");
});


app.listen(3000);