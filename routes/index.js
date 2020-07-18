var express = require("express");
var router = express.Router();
passport 				= require("passport"),
localStrategy 			= require("passport-local"),
passportLocalMongoose 	= require("passport-local-mongoose");

//RESTFULL ROUTES
var User = require("../models/user");
var StudentRegistration = require("../models/register");
var jsCourse = require("../models/jsCourse");
var ssaCourse = require("../models/ssaCourse");
var sssCourse = require("../models/sssCourse");
var CourseReg = require("../models/CourseReg");
var ssaCourseReg= require("../models/ssaCourseReg");
var sssCourseReg = require("../models/sssCourseReg");

//INDEX ROUTES
router.get("/", function(req, res){
	res.render("index");
});

//NEW ROUTES

router.get("/poli/new", function(req, res){
	res.render("new");

});




//CREATE ROUTES
router.post("/poli/new", function(req, res){ 

	var thisyr = new Date().getFullYear().toString().substr(2, 3);
	var level = req.body.level;
	var student_id = thisyr + "/PSS/" + level + "/";

	StudentRegistration.find({ username: {$regex: student_id, $options: "i" }}, function(err, student){
/*		function isEmpty(student) {
		    for(var prop in student) {
		        if(student.hasOwnProperty(prop))
		            return false;
		    }

		    return true;
		}*/
			var thisyr = new Date().getFullYear().toString().substr(2, 3);
			var level = req.body.level;
			var student_id = thisyr + "/PSS/" + level + "/";
	
		console.log(student);
		if (!(student === undefined || student.length == 0)) {
			var foundData = [];
			student.forEach(function(data){
				var cut = parseInt(data.username.substr(11, 13));
				foundData.push(cut);
			});

			var last = addZ(Math.max(...foundData) + 1);

			var student_id = student_id + last.toString();
		}else {
			
			var student_id = student_id + "001";
		}


	

		var newData = { 
			firstname: req.body.firstname,
			secondname: req.body.secondname,
			othername: req.body.othername,
			nickname: req.body.nickname,
			gender: req.body.gender,
			level: req.body.level,
			parentname: req.body.parentname,
			image: req.body.image,
			username: student_id
		 }

		StudentRegistration.create(newData, function(err, newRegister){
			if (err) {
				console.log(err);
			}else{
				res.redirect('/register/'+ newRegister._id);
			}
		});
 
	});	

});



//EDIT ROUTES

//UPDATE ROUTES

//DELETE ROUTES

router.post("/register" , function(req, res){
	var newUser = new User({username: req.body.username});
	User.register( newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
		}
		StudentRegistration.findOne({username: user.username}, function (err, student) {
			if(err){
				console.log(err);
			}else{
				
				user.StudentRegistration.push(student);
				user.save(function(err, user){
					if (err) {
						console.log(err)
					}else{
						passport.authenticate("local")(req, res, function(){
							res.redirect('/registerCourses/' + student.level.toLowerCase() + '/' + student.id);		
						});
					}
				});
			}
		})
		
	})
});

router.get("/register/:id", function(req, res){
	StudentRegistration.findById(req.params.id, function(err, studentData){
		if (err) {
			console.log(err);
		}else{
			res.render("register", {studentData: studentData});
		}
		
	});
	
});


router.get("/poli/login", function(req, res){
	res.render("login", {message: req.flash("error")});
});


router.post('/poli/login',
  passport.authenticate("local", 
	{
		failureRedirect: "/poli/login"}),
  function(req, res) {
  	req.flash("message", "Logged in success");
   User.findById(req.user.id).populate("StudentRegistration").populate("CourseReg").exec(function(err, student){	
		if(err){
			console.log(err);
		}else{
			/*console.log(student.StudentRegistration[0].id);*/

			
			res.redirect('/poli/' + student.StudentRegistration[0].id + '/' + student.CourseReg[0].id);			
		}

	});

  });

router.get("/poli/logout", function(req, res){
	req.logout();
	res.redirect("/");
});


//SHOW ROUTES
router.get("/poli/:id/:token", function(req ,res){

	StudentRegistration.findById(req.params.id, function(err, student){
		if (err) {
			console.log(err);
		}else{	
			CourseReg.findById(req.params.token, function(err, course){
				if (err) {
					console.log(err);
				}else{
						const compulsory = course.compulsory.split(",");
						const category_one = course.category_one.split(",");
						const category_two = course.category_two.split(",");
						const category_three = course.category_three.split(",");
					res.render("poli", {student: student, compulsory: compulsory, category_one: category_one, category_two: category_two, category_three: category_three });
				}
			})
			
		}
	});
	
});

//COURSES ROUTES

router.get("/registerCourses/:level/:id", function(req ,res){
	
	if (req.params.level == "js1" || req.params.level == "js2" || req.params.level == "js3") {
		
				jsCourse.findOne({level: "js"}, function(err, course){
					if (err) {
						res.send(err)
					}else{		
						
						const compulsory = course.compulsory.split(",");
						const nigerian_language = course.nigerian_language.split(",");
						const sport_recreation = course.sport_recreation.split(",");
						const religion = course.religion.split(",");

						
						res.render("jscourses" ,{compulsory: compulsory, nigerian_language: nigerian_language, sport_recreation: sport_recreation, religion: religion, id: req.params.id});
			

				}
				})
	}else if(req.params.level == "ss1" || req.params.level == "ss2" || req.params.level == "ss3"){
				
				sssCourse.findOne({level: "sss"}, function(err, course){
					if (err) {
						res.send(err)
					}else{		
						const compulsory = course.compulsory.split(",");
						const basic_science_and_maths = course.basic_science_and_maths.split(",");
						const technical_and_agricultural = course.technical_and_agricultural.split(",");
						const liberal_arts_and_social_science = course.liberal_arts_and_social_science.split(",");

						
						res.render("ssscourses" ,{compulsory: compulsory, basic_science_and_maths: basic_science_and_maths, technical_and_agricultural: technical_and_agricultural, liberal_arts_and_social_science: liberal_arts_and_social_science, id: req.params.id});
			
					}
				})
	}else if(req.params.level == "sm1" || req.params.level == "sm2" || req.params.level == "sm3"){
		
			ssaCourse.findOne({level: "ssa"}, function(err, course){
				if (err) {
					res.send(err)
				}else{
							
					const compulsory = course.compulsory.split(",");
					const commercial = course.commercial.split(",");
					const technical_and_agricultural = course.technical_and_agricultural.split(",");
					const liberal_arts_and_social_science = course.liberal_arts_and_social_science.split(",");

					
					res.render("ssacourses" ,{compulsory: compulsory, commercial: commercial, technical_and_agricultural: technical_and_agricultural, liberal_arts_and_social_science: liberal_arts_and_social_science, id: req.params.id});
			
				}
			})
	}
	


	
});


router.post("/register/jscourse/:id",async function(req ,res){
	
	const courseSelected = {
		compulsory: "mathematics,english,civic education",
	    category_one : req.body.nigerian_language,
	    category_two : req.body.sport_recreation,
	    category_three : req.body.religion
	}

	console.log(courseSelected);
	CourseReg.create(courseSelected, function(err, registeredCourses){
		if (err) {
			console.log(err);
		}else {
			StudentRegistration.findById(req.params.id, function(err, studentData){
				if (err) {
					console.log(err);
				}else{
					
					User.findOne({username: studentData.username}, function(err, student){
						if (err) {
							console.log(err);
						}else{
							student.CourseReg.push(registeredCourses);
							student.save(function(err, user){
								if (err) {
									console.log(err)
								}else{
									/*res.render("login");*/
										
										res.redirect('/poli/' + student.StudentRegistration[0] + '/' + registeredCourses.id);
										/*res.redirect('/poli/' + student.StudentRegistration[0].id + '/' + student.CourseReg[0].id);		
							*/
										
										/*res.redirect('/poli/login');*/
											
								}
							});
								
								/*res.render("register", {studentData: studentData});*/			
						}
						
					});	
				}
				
			});
		}
	});

});




router.post("/jscourse",async function(req ,res){

	const newCourse = new jsCourse({
			level: req.body.level,
			compulsory: req.body.compulsory,
			nigerian_language: req.body.nigerian_language,
			sport_recreation: req.body.sport_recreation,
			religion: req.body.religion
		})

		try {
			const newcourse = await newCourse.save();
			res.send(newcourse);
		} catch(err) {
			// statements
			res.status(400).send(err)
		}

});

router.post("/ssacourse",async function(req ,res){

	const newCourse = new ssaCourse({
			level: req.body.level,
			compulsory: req.body.compulsory,
			commercial: req.body.commercial,
			technical_and_agricultural: req.body.technical_and_agricultural,
			liberal_arts_and_social_science: req.body.liberal_arts_and_social_science
		})

		try {
			const newcourse = await newCourse.save();
			res.send(newcourse);
		} catch(err) {
			// statements
			res.status(400).send(err)
		}

});

router.post("/ssscourse",async function(req ,res){

	const newCourse = new sssCourse({
			level: req.body.level,
			compulsory: req.body.compulsory,
			basic_science_and_maths: req.body.basic_science_and_maths,
			technical_and_agricultural: req.body.technical_and_agricultural,
			liberal_arts_and_social_science: req.body.liberal_arts_and_social_science
		})

		try {
			const newcourse = await newCourse.save();
			res.send(newcourse);
		} catch(err) {
			// statements
			res.status(400).send(err)
		}

});

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

function addZ(n) {
  return (n<10? '00' : n<100? '0' : '') + n;
}




module.exports=  router;