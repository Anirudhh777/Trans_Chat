var mongoose = require('mongoose');
var User = mongoose.model('User');
var Contact = mongoose.model('Contact');
var Chat = mongoose.model('Chat');

module.exports = (function() {
 return {
 		create: function(req, res) {
		  var user = new User({name: req.body.name, email:req.body.email, phone:req.body.phone, password:req.body.password, created_at: req.body.created_at});
		  user.save(function(err) {
		    if(err) {
		      	console.log(err,'something went wrong');
		    } else { 
		    	User.findOne({email: req.body.email}).deepPopulate(['contacts','requests']).exec(function(err, user){
		    	User.findOne({email: "demo@123.com"}, function(err, demo){
		    		if(demo){
		    			var contact = new Contact();
		    			var contact1 = new Contact();
 						var chat = new Chat({contactId: demo._id, contactName: "Demo"});
 						var chat1 = new Chat({contactId: user._id, contactName: req.body.name});
 						contact._User = demo._id;
 						user.contacts.push(contact);
 						contact1._User = user._id;
 						demo.contacts.push(contact1);
 						chat._User = user._id;
 						user.chats.push(chat);
 						chat1._User = demo._id;
 						demo.chats.push(chat1);
 						user.save(function (err){
 						demo.save(function (err){
 						contact.save(function (err){
 						contact1.save(function (err){
 						chat.save(function (err){
 						chat1.save(function (err){
 							if(err){
 								console.log("Error savinv Demo as contact")
 							}else{
 								console.log('successfully added a user!');
			    				res.json(user);
 							}
 						})
 						})
 						})
 						})
 						})
 						})
		    		}
		    	})
		    	})
	    }
	  })
	 },
	 	login: function(req, res) {
		     User.findOne({email: req.body.email}).deepPopulate(['contacts', 'requests']).exec(function (err, user) {
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