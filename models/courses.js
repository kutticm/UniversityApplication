const mongoose = require('mongoose');



const CourseSchema = mongoose.Schema({
	teacher_name:{
		type : String,
		required : true
	},
	course_name:{
		type : String,
		required : true
	},
	start_time:{
		type : String,
		required : true
	},
	end_time:{
		type : String,
		required : true
	}
});

const Course = module.exports = mongoose.model('Course', CourseSchema);