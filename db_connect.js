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

questions.count({}, function(err, count){
		if(err) return handleError(err);
		//set number of questions
    	db_length = count;
  
});

//get one question
var getQuestions = function(req, res){
	
	var visible_questions = [];
	var q_index = Math.floor(Math.random() * db_length + 1);
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


module.exports.getQuestions = getQuestions;

