var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//connect to db
mongoose.connect("mongodb://localhost/questions");

//connect to quest collection
var questions = mongoose.model("questions", new Schema({
	quest_id: Number,
	body: String,
	option1: String,
	option2: String,
	option3: String,
	answer: String
}), "quest");

var db_length = 1;
var getDbLength = function(){
	questions.count({}, function(err, count){
		if(err) return handleError(err);
		//set number of questions
    	db_length = count;
    	// console.log(db_length);
  
});
}

getDbLength();

//get one question
var getQuestions = function(req, res){
	
	// var visible_questions = [];
	var q_index = Math.floor(Math.random() * db_length);
	console.log(q_index);
	//find element in db
	questions.findOne({quest_id: q_index}, function(err, quest){
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
	
}

var uploadQuestion = function(req, res){
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
}




module.exports.getQuestions = getQuestions;
module.exports.uploadQuestion = uploadQuestion;

