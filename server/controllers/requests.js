var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var User = mongoose.model('User');

module.exports = (function() {
 return {
 		send: function(req, res){
 			console.log("Inside backend Controller Send Request");
 			User.findOne({_id: req.body.send_id}).populate('Requests').exec(function (err, user){
 				User.findOne({_id: req.body.recieved_id}).populate('Request').exec(function (err, user1){
 					var req_sent = new Request({status:req.body.send_status,req_to_id:req.body.recieved_id,req_to_name:req.body.recieved_name});
 					var req_recieved = new Request({status:req.body.recieved_status,req_from_id:req.body.send_id,req_from_name:req.body.send_name});
 					req_sent._User = user._id;
 					req_recieved._User = user1._id;
 					user.requests.push(req_sent);
 					user1.requests.push(req_recieved);
 					req_sent.save(function (err){
 					req_recieved.save( function (err){
 					user.save(function (err){
 					user1.save(function (err){
 						if(err){
 							console.log("Something went wrong")
 						}else{
 							console.log("Sent friend request");
 							res.redirect('/')
 						}
 					})
 					})
 					})
 					})
 				})
 			})
 		},
 		get_requests: function(req, res){
 			Request.find({_User: req.body._id,status:"Recieved"}, function(err, request){
 				if(err){
 					console.log("No Requests Found");
 					res.json(err);
 				}else{
 					res.json(request);
 				}
 			})
 		}
 	}
})();