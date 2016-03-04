var mongoose = require('mongoose');
var User = mongoose.model('User');
var Contact = mongoose.model('Contact');
var Chat = mongoose.model('Chat');
var Message = mongoose.model('Message');

module.exports = (function() {
 return {
 		create: function(req, res) {
		  var user = new User({name: req.body.name, email:req.body.email, phone:req.body.phone, password:req.body.password, created_at: req.body.created_at});
		  user.save(function(err) {
		    if(err) {
		      	console.log(err,'something went wrong');
		      	var error = "Email ID already Exists";
		      	res.json(error);
		    } else { 
		    	User.findOne({email: req.body.email}).deepPopulate(['contacts','requests', 'messages']).exec(function (err, user){
		    	User.findOne({email: "demo@123.com"}, function (err, demo){
		    		if(demo){
		    			var contact = new Contact();
		    			var contact1 = new Contact();
 						var chat = new Chat({contactId: demo._id, contactName: "Demo"});
 						var chat1 = new Chat({contactId: user._id, contactName: req.body.name});
 						var message = new Message({oMessage:"Welcome to Lets Talk!, you can use this app to chat with ur friends in a lot of different languages. Do not Message me, i wont respond, Im busy. Have fun using the app!. GoodBye", tMessage: "Welcome to Lets Talk!, you can use this app to chat with ur friends in a lot of different languages. Do not Message me, i wont respond, im busy. Have fun using the app!. GoodBye", sentById: demo._id, sentByName:"Demo", recvdById: user._id, recvdByName: user.name, created_at: req.body.created_at});
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
 						message.save(function (err){
 							if(err){
 								console.log("Error saving Demo as contact")
 							}else{
 								console.log('successfully added a user!');
 								Chat.findOne({_User: user._id}).deepPopulate('messages').exec(function (err, chat3){
			 						if(chat3){
			 							message._Chat = chat3._id;
			 							chat3.messages.push(message);
			 							chat3.save(function (err){
			 								if(err){
			 									console.log("Error saving message in user chat");
			 								}else{
			 									res.json(user);
			 								}
			 							})
			 						}
			 					})
 							}
 						})
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
		     User.findOne({email: req.body.email}).deepPopulate(['contacts', 'requests', 'chats']).exec(function (err, user) {
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