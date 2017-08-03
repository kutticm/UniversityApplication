const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Course = require('../models/courses');

//retrieving courses
router.get('/courses',function(req,res,next){
	Course.find(function(err,courses){
		res.json(courses);
	});
}) ;

//add course
router.post('/course',function(req,res,next){
	let newCourse = new Course({
		teacher_name : req.body.teacher_name,
		course_name : req.body.course_name,
		start_time : req.body.start_time,
		end_time : req.body.end_time
	});
	newCourse.save(function(err,course){
		if(err){
			res.json({msg: 'Failed to add course'});
		}
		else{
			res.json({msg: 'Course added successfully'});
		}
	});
});

//delete course
router.delete('/course/:id',function(req,res,next){
	Course.remove({_id:req.params.id},function(err,result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});


module.exports = router;