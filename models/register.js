var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var RegistrationSchema = mongoose.Schema({
	firstname: String,
	secondname: String,
	othername: String,
	nickname: String,
	gender: String,
	level: String,
	parentname: String,
	image: String,
	username: String,
	date: { type: Date, default: Date.now}
	
});

RegistrationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("StudentRegistration", RegistrationSchema);