var models = require("./models.js");
// var db = require("./db_questions.js");

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
				req.session.foundUser = foundUser;
				res.redirect("/dashboard");
			} else{
				res.render("login.jade", {error: "Invalid username or password"});
			}
		}
	});

}

var checkSession = function(req,res){
	if(req.session && req.session.foundUser){
		return true;
	} else {
		return false;
	}

}

var getLoggedInUser = function(req,res, app){
	models.user.findOne({email: req.session.foundUser.email}, function(err, userSession){
			if(!userSession){
				req.session.reset();
			} else {
				app.locals.user = userSession;
			}
		});
}

//get profile

var getProfile = function(req,res){
	models.user.findOne({username: req.query.username}, function(err, foundUser){
		if(!foundUser){
			res.send("user not found");
		} else {
			var params = {
				name: foundUser.username,
				email: foundUser.email,
				score: foundUser.scores
			}
			res.render("profile.jade", params);
		}
	});
}


module.exports.saveUser = saveUser;
module.exports.verifyUser = verifyUser;
module.exports.checkSession = checkSession;
module.exports.getLoggedInUser = getLoggedInUser;
module.exports.getProfile = getProfile;