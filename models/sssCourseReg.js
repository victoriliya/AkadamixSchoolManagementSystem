var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 
var CourseSchema = new mongoose.Schema({
	level: String,
	compulsory: String,
	basic_science_and_maths : String,
	technical_and_agricultural: String,
    liberal_arts_and_social_science: String
});

module.exports = mongoose.model("sssCourseReg", CourseSchema);
