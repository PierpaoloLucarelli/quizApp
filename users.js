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
				req.session.foundUser = foundUser;
				res.redirect("/dashboard");
			} else{
				res.render("login.jade", {error: "Invalid username or password"});
			}
		}
	});

}

var checkSession = function(req,res){
	var isLogedIn = true;
	console.log("runnign session");
	if(req.session && req.session.foundUser){
		models.user.findOne({email: req.session.foundUser.email}, function(err, userSession){
			if(!userSession){
				req.session.reset();
				console.log("user not found");
			} else {
				isLogedIn = true;
				console.log("found the users");
				res.locals.user = userSession;
			}
		})
	} else {
		console.log("session not found");
	}

	return isLogedIn;
}

module.exports.saveUser = saveUser;
module.exports.verifyUser = verifyUser;
module.exports.checkSession = checkSession;