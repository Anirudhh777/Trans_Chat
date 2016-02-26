var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');

module.exports = (function() {
return {
		loadChat: function(req, res) {
			Chat.findOne({_User: req.body.userId, contactId: req.body.contactId}).deepPopulate('messages').exec(function (err, chat){
				if(err){
					console.log("Could not load Chat");
				}else{
					res.json(chat);
				}
			})
		}
 	 }
})();