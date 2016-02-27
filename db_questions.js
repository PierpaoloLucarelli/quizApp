var models = require("./models.js");

var getQuestions = function(res){
	models.questions.count().exec(function(err, count){

  	var random = Math.floor(Math.random() * count);

  	models.questions.findOne().skip(random).exec(
    function (err, quest) {
    	if(!quest){
			res.send("Not found");
		} else {
		var params = {
			body: quest.body,
			option1: quest.option1,
			option2: quest.option2,
			option3: quest.option3,
			correct: quest.answer
		}

		res.render("dashboard.jade");
	}
  	});

});
}

var questionToJson = function(res){
	models.questions.count().exec(function(err, count){

  	var random = Math.floor(Math.random() * count);

  	models.questions.findOne().skip(random).exec(
    function (err, quest) {
    	if(!quest){
			res.send("Not found");
		} else {
		var params = {
			body: quest.body,
			option1: quest.option1,
			option2: quest.option2,
			option3: quest.option3,
			correct: quest.answer
		}

		res.json(params);
	}
  	});

});
}

var uploadQuestion = function(req, res){
	var quest = new models.questions({
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
module.exports.questionToJson = questionToJson;

