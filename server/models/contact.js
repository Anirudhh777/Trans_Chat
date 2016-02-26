var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new mongoose.Schema({
	_User: {type: Schema.Types.ObjectId, ref: 'User'}
})

mongoose.model('Contact', ContactSchema);