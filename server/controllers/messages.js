var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');
var Chat = mongoose.model('Chat');

module.exports = (function() {
 return {
 			save_message: function(req, res){
 				Chat.findOne({_User: req.body.userId, contactId: req.body.contactId}).populate('messages').exec(function (err, chat){
 				Chat.findOne({_User: req.body.contactId, contactId: req.body.userId}).populate('messages').exec(function (err, chat1){
 				var message = new Message({oMessage: req.body.oMessage, tMessage: req.body.tMessage, sentByName: "You", sentById: req.body.userId, recvdById: req.body.contactId, recvdByName: req.body.contactName, created_at: req.body.created_at});
 				var message1 = new Message({oMessage: req.body.oMessage, tMessage: req.body.tMessage, sentByName: req.body.userName, sentById: req.body.userId, recvdById: req.body.contactId, recvdByName: req.body.contactName, created_at: req.body.created_at});
 				chat1.msgCount = chat1.msgCount + 1;
 				message._Chat = chat._id;
 				chat.messages.push(message);
 				message1._Chat = chat1._id;
 				chat1.messages.push(message1);
 				chat.save(function (err){
 				chat1.save(function (err){
 				message.save(function (err){
 				message1.save(function (err){
 					if(err){
 						console.log("Error saving messages")
 					}else{
 						console.log("Saved Message")
 						res.json(chat);
 					}
 				})
 				})
 				})
 				})
 				})
 				})
 			},
 			delete_message: function(req, res){
 				var msgId;
 				console.log(req.body.userId,req.body.contactId,req.body.tMessage,req.body.oMessage)
 				Message.find({sentById: req.body.userId, recvdById: req.body.contactId, tMessage: req.body.tMessage, oMessage: req.body.oMessage}).exec(function (err, message){
 					if(err){
 						console.log("Message not found");
 					}if(message){
 						console.log(message);
 						msgId = message._id;
 					}
 				})
 				Message.remove({sentById: req.body.userId, recvdById: req.body.contactId, tMessage: req.body.tMessage, oMessage: req.body.oMessage}, function(err, message){
 					if(err){
 						console.log("Error removing contact message");
 					}else{
 					console.log("Contact Message Removed")
 					}
 				})
 				Message.remove({_id: req.body.messageId}, function(err, message){
 					if(err){
 						console.log("Error removing user message");
 					}else{
 					console.log("User Message Removed")
 					res.json(message);
 					}
 				})
 			}
 	 	}
})();