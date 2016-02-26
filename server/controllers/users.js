var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
 return {
 		create: function(req, res) {
		  var user = new User({name: req.body.name, email:req.body.email, phone:req.body.phone, password:req.body.password, created_at: req.body.created_at});
		  user.save(function(err) {
		    if(err) {
		      	console.log(err,'something went wrong');
		    } else { 
			    console.log('successfully added a user!');
			    res.redirect('/');
	    }
	  })
	 },
	 	login: function(req, res) {
		     User.findOne({email: req.body.email}).deepPopulate('contacts').exec(function (err, user) {
		       if(user === null) {
		          var error = "User not found"
		          console.log(error);
		          res.redirect('/');
		       }
		       else{
		        user.comparePassword(req.body.password, function(err, isMatch){
		          if(isMatch){
		            res.json(user);
		            }
		            else{
		              var error = "Password Incorrect"
		              console.log(error);
		              res.redirect('/');
		            }
		        })
		       }
		     })
		},
		find: function(req, res) {
			User.findOne({email: req.body.email}, function(err, user) {
				if(err){
					var error = "User Does Not Exist"
					res.json(error);
				}else{	
					res.json(user);
				}
			})
		}
 }
})();