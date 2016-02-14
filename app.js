var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//lenght of the question db
var db_length =1 ;

app.use(bodyParser.urlencoded({extended: true}));

var questions = mongoose.model("questions", new Schema({
	quest_id: Number,
	body: String,
	option1: String,
	option2: String,
	option3: String,
	answer: String
}), "quest");

app.set('view engine', 'jade');

app.use("/static", express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost/questions");


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
	res.render("insert.jade");
})

app.get("/", function(req, res){
	questions.count({}, setNumberofDocuments);
	var quest_index = Math.floor(Math.random() * db_length + 1);
	console.log(quest_index);
	
	questions.findOne({quest_id: quest_index}, function(err, quest){
		if(!quest){
			res.send("Not found");
		} else {
			var params = {
				body: quest.body,
				option1: quest.option1,
				option2: quest.option2,
				option3: quest.option3
			}
			res.render("index.jade", params);
		}
	})

})

app.get("/next", function(req,res){
	res.send("hello");
})

var setNumberofDocuments = function(err, count){ 
        if(err) return handleError(err);

        db_length = count;

      };

app.listen(8000);