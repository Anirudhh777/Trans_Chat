var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var User = mongoose.model('User');
var Contact = mongoose.model('Contact');
var Chat = mongoose.model('Chat');

module.exports = (function() {
 return {
 			add_contact: function(req, res) {
 				User.findOne({_id:req.body.userId}).deepPopulate('contacts').exec(function (err, user){
 					User.findOne({_id:req.body.reqFromId}).populate('contacts').exec(function (err, user1){
 						var contact = new Contact();
 						var contact1 = new Contact();
 						var chat = new Chat({contactId: req.body.reqFromId, contactName: req.body.reqFromName, created_at: req.body.created_at});
 						var chat1 = new Chat({contactId: req.body.userId, contactName: req.body.userName, created_at: req.body.created_at});
 						contact._User = user1._id;
 						user.contacts.push(contact);
 						contact1._User = user._id;
 						user1.contacts.push(contact1);
 						chat._User = user._id;
 						user.chats.push(chat);
 						chat1._User = user1._id;
 						user1.chats.push(chat1);
 						contact.save(function (err){
 						contact1.save(function (err){
 						user.save(function (err){
 						user1.save(function (err){
 						chat.save(function (err){
 						chat1.save(function (err){
 							if(err){
 								console.log("Something Went Wrong");
 							}else{
 								User.findOne({_id:req.body.userId}).populate('requests').exec(function (err, user){
 								User.findOne({_id: req.body.reqFromId}).populate('requests').exec( function (err, user1){
 									for(var i=0;i<user.requests.length;i++){
 										if(user.requests[i].req_from_id === req.body.reqFromId){
 											user.requests.splice(i,1);
 										}
 									}
 									for(var j=0;j<user1.requests.length;j++){
 										if(user1.requests[j].req_to_id === req.body.userId){
 											user1.requests.splice(j,1);
 										}
 									}
 									user.save(function (err){
 									user1.save(function (err){
 										if(err){
 											console.log("Problem Saving users after deleting requests");
 										}else{
 											Request.remove({_id: req.body.requestId}, function (err, request){
		 									Request.remove({req_to_id: req.body.userId, _User: req.body.reqFromId}, function (err, request){
		 									if(err){
		 										console.log("Something went wrong while deleting Requests");
		 									}else{
		 										console.log("Succesfully Added Contacts");
		 										res.json(user);	
		 									}
		 								})
		 								})
 										}
 									})	
 									})
 								})	
 								})
 							}
 						})
 						})
 						})
 						})
 						})	
 						})
 					})
 				})
 			},
 			userFind: function (req, res){
 				User.findOne({email: req.body.email}).deepPopulate('contacts').exec(function (err, user){
 					if(err){
 						console.log("Something went wrong");
 					}else{
 						res.json(user);
 					}
 				})
 			},
 			get_contacts: function (req, res){
 				var ids = req.body.contacts.map(function(contact) { return contact._User });
			    User.find({_id: {$in: ids}}, function(err, users) {
			        res.json(users);
    				});
 			}
 	 	}
})();