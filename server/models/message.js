var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
	oMessage: String,
	tMessage: String,
	sentByName: String,
	sentById: String,
	recvdById: String,
	recvdByName: String,
	created_at: Date,
	_Chat: {type: Schema.Types.ObjectId, ref: 'Chat'}
})

mongoose.model('Message', MessageSchema);