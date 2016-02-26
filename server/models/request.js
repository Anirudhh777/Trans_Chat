var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new mongoose.Schema({
	status: String,
	req_to_id: String,
	req_to_name: String,
	req_from_id: String,
	req_from_name: String,
	_User: {type: Schema.Types.ObjectId, ref: 'User'}
})

mongoose.model('Request', RequestSchema);