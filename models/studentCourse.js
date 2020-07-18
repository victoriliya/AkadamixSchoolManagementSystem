var mongoose = require("mongoose");
 
var StudentCourseSchema = new mongoose.Schema({
	username: String,
	Course: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "StudentCourse"
		}
	]

});


module.exports = mongoose.model("StudentCourse", StudentCourseSchema);
