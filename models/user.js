var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 
var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	StudentRegistration: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "StudentRegistration"
		}
	],
	CourseReg: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "CourseReg"
		}
	]

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
