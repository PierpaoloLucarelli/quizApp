//initialize the array of questions
var questions = [["What is 20% of 150?", "50", "40", "30", "C"],
				["What is my name? ", "Pierpaolo", "Mark", "Luke", "A"],
				["Where is the UK?", "America", "Europe", "Asia", "B"],
				["What is the value of PI?", "5.87", "3.14", "1.27", "B"],
				["Who is Einstein?", "A scientist", "A Sportsman", "A Noble", "A"],
				["What is the capital of Italy?", "Perugia", "Roma", "Napoli", "B"],
				["What is the capital of the UK?", "Brighton", "Manchester", "London", "C"],
				["Where is Facebook HQ based?", "San Francisco", "California", "New York", "A"]
				];
var answers = [];
var q_index = Math.floor((Math.random() * questions.length));;
var numCorrect = 0;
var score = 0;

$( document ).ready(function(){

	//initialize to first question
	console.log("running");
	$(".question-title").text(questions[q_index][0]);
	for(var i = 0 ; i <= 3 ; i++){
		$("#myform :nth-child(" + (i * 2)+ ")").text(questions[q_index][i]);
	}


	//next button event
	$("#next-q").click(function(){
		var selectedVal = $("#myform input[type='radio']:checked").val();
		// console.log(selectedVal);
		answers.push(selectedVal);
		if(selectedVal === questions[q_index][4]){
			score++;
		}
		console.log(score);
		console.log(answers);
		console.log("current q: " + q_index + "length of " + questions.length);
		questions.splice(q_index,1);

		if(answers.length < 4){
			getNextQuestion();
		} else{
			$("#next-q").css("display", "none");
			$("#submit-q").css("display", "block");
		}

	});

	//check if answers are correct
	$("#submit-q").click(function(){
		// console.log("you have guessed " + numCorrect);
		$("#correct").text("You have guessed: " + score + " out of: " + answers.length);
	});
});


var getNextQuestion = function(){

	q_index = Math.floor((Math.random() * questions.length));
	$(".question-title").text(questions[q_index][0]);
	for(var i = 0 ; i <= 3 ; i++){
		$("#myform :nth-child(" + (i * 2)+ ")").text(questions[q_index][i]);
	}
	

}


