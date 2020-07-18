var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 
var CourseSchema = new mongoose.Schema({
	level: String,
	compulsory: String,
	category_one: String,
	category_two: String,
	category_three: String
});



module.exports = mongoose.model("CourseReg", CourseSchema);
