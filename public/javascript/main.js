$( document ).ready(function(){

	var score = 0;
	var correct;

	$("#next-q").click(function(event){
		var val = $(".question-check:checked").val();
		if(val === correct){
			console.log("correct");
		} else {
			console.log("wrong");
		}
		event.preventDefault();
		$.ajax({
			type: 'GET',
			url: '/next',
			success: function(question){
				$(".question-title").html(question.body);
				$("#option1").html(question.option1);
				$("#option2").html(question.option2);
				$("#option3").html(question.option3);
				correct = question.correct;
			}
		});
	});
});