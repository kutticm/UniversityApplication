const express = require('express');
const router = express.Router();

const Student = require('../models/students');
const Course = require('../models/courses');

//retrieving courses
router.get('/courses',function(req,res,next){
	Course.find(function(err,courses){
		res.json(courses);
	});
}) ;

router.put('/registerCourse/:student_id',function(req,res,next){	
	Student.update({student_id:req.params.student_id},{ "$push": { "student_courses": "123" } },function(err,stu){
		if(err){
			res.json({success : false, msg:err});
		}
		else{
			res.json({success : true, msg: 'Student registerd to course successfully'});
		}
		});

		});

}) ;

router.post('/register',function(req,res,next){
	let newStudent = new Student({
		student_id: req.body.student_id,
		student_name: req.body.student_name,
		student_courses: req.body.student_courses
	});

	newStudent.save(function(err,student){
		if(err){
			res.json({success : false, msg:'Student is not registerd into student database'});
		}
		else{
			res.json({success : true, msg: 'Document added in student successfully'});
		}
	});	
}) ;

module.exports = router;