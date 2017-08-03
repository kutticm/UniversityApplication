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

router.get('/registerCourse/:student_id',function(req,res,next){
	Course.find({_id : req.params.student_id},function(err,course){
		res.json(course);
	});
}) ;

router.post('/register',function(req,res,next){
	let newStudent = new Student({
		student_id: req.body._id,
		student_name: req.body.name
	});

	newStudent.save(function(err,student){
		if(err){
			res.json({err});
		}
		else{
			res.json({msg: 'Document added in student successfully'});
		}
	});	
}) ;

module.exports = router;