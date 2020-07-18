var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 
var CourseSchema = new mongoose.Schema({
	level: String,
	compulsory: String,
	nigerian_language: String,
	sport_recreation: String,
	religion: String
});



module.exports = mongoose.model("Course", CourseSchema);
