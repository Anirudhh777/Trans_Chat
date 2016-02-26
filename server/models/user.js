var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);
bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  email: String,
  phone: Number,
  password:  { type: String, required: true },
  created_at: Date,
  contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
  requests: [{type: Schema.Types.ObjectId, ref: 'Request'}],
  chats: [{type: Schema.Types.ObjectId, ref: 'Chat'}]
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.plugin(deepPopulate);
mongoose.model('User', UserSchema);