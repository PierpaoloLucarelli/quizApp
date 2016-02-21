var models = require("./models.js");

//save user
var saveUser = function(req, res){
	var user = new models.user({
		email: 			req.body.email,
		username: 		req.body.username,
		password: 		req.body.password,
		$push: 			{ scores: 0 } 
	});

	user.save(function(err){
		if(err){
			res.send(err);
		} else {
			res.redirect("/");
		}

	})
};

//check login credentials
var verifyUser = function(req,res){

	models.user.findOne({email : req.body.email}, function(err, foundUser){
		if(!foundUser){
			res.render("login.jade", {error: "Invalid email or password"});
		} else {
			if(foundUser.password === req.body.password){
				res.redirect("/dashboard");
			} else{
				res.render("login.jade", {error: "Invalid username or password"});
			}
		}
	});

}

module.exports.saveUser = saveUser;
module.exports.verifyUser = verifyUser;