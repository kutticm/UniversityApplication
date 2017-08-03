//importing modules

var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyparser = require('body-parser');
var path = require('path');
const passport = require('passport');

var app = express();

const teacherroute = require('./routes/teacherroute');

const studentroute = require('./routes/studentroute');

const userroute = require('./routes/userroute.js')

//connect to mongodb

mongoose.connect('mongodb://localhost:27017/courses');

mongoose.connection.on('connected',function(){
	console.log('Connected to database mongodb @ 27017');
})

mongoose.connection.on('error',function(err){

	if(err){
		console.log('Error database connection'+err);
	}
})

const port = 5000;

app.use(cors());
app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/teacher',teacherroute);
app.use('/api/student',studentroute);
app.use('/api/user',userroute)

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port,function(){
	console.log("Server started at port:"+port);
})