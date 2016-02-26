var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var ChatSchema = new mongoose.Schema({
	contactId: String,
	contactName: String,
	created_at: Date,
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
	_User: {type: Schema.Types.ObjectId, ref: 'User'}
})
ChatSchema.plugin(deepPopulate);
mongoose.model('Chat', ChatSchema);