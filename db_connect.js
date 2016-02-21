var models = require("./models.js");

var db_length = 1;
var getDbLength = function(){
	models.questions.count({}, function(err, count){
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
	models.questions.findOne({quest_id: q_index}, function(err, quest){
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
	var quest = new models.questions({
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

//thigns to install
// npm install express
// npm install mongoose

// use questions
// db.quest.insert({question_id: 1, body: "question body", option1: "option1", option2: "option2", option3: "option3", answer: "C"})

