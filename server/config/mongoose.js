var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://localhost/Trans_Chat');
var models_path = __dirname + '/../models'
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})
var User = mongoose.model('User');
User.findOne({email: "demo@123.com"}, function(err, user){
	if(!user){
		var user = new User({name: "Demo", email: "demo@123.com", phone:0000000000, password:"4321"});
		user.save(function(err) {
			if(err) {
				console.log('something went wrong');
				}else{ 
					console.log('successfully added a Demo user!');
			    }
		})
	}
})



