var express 				= require("express"),
	app 					= express(),
	mongoose 				= require("mongoose"),
	request 				= require("request"),
	bodyParser 				= require("body-parser");


var indexRoutes 			= require("./routes/index");
var User 					= require("./models/user");
var StudentRegistration 	= require("./models/register");
var flash 					= require("connect-flash");
const dotenv 				= require("dotenv");
/*mongoose.connect("mongodb://localhost:27017/poli_db", {useNewUrlParser: true, useUnifiedTopology: true});
*/
dotenv.config();

mongoose.connect( process.env.ClOUD_MONGODB , {useNewUrlParser: true, useUnifiedTopology: true} , ()=>{
	console.log("db Connected");
})


mongoose.set('useCreateIndex', true);

app.use(flash());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.json());


app.use(require("express-session")({
	secret: "coolest guy ever liveth",
	resave: false,
	saveUninitialized: false
}));


app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})


// ===============
// Routes
// ===============

app.use(indexRoutes);


app.listen(3000, function(){
	console.log("poli server running..");
})


/*<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets7.lottiefiles.com/packages/lf20_lYC5mj.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player>*/