var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 
var CourseSchema = new mongoose.Schema({
	level: String,
    compulsory : String,
    commercial : String,
    technical_and_agricultural: String,
    liberal_arts_and_social_science_stream: String
});



module.exports = mongoose.model("ssaCourseReg", CourseSchema);
