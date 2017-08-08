const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
	student_id:{
		type : String,
		required : true
	},

	student_name:{
		type : String,
		required : true
	},

	student_courses:[{type:String}]
});

const Student = module.exports = mongoose.model('Student', StudentSchema);

