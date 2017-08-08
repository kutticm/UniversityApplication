const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/register',function(req,res,next){
	let newUser = new User({
		name : req.body.name,
		email:req.body.email,
		username : req.body.username,
		password:req.body.password,
		designation:req.body.designation

	});

	User.addUser(newUser, function(err,user){
		if(err){
			res.json({success : false, msg :'Failed to register user'});
		}
		else{
			res.json({success : true, msg : 'User Registered successsfully', user : user});
		}
	})

}) ;

router.post('/authenticate', function(req,res,next){
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByName(username, (err,user) => {
		if(err) throw err;
		if(!user){
			return res.json({success:false, msg : "User not found"});
		}

		User.comparePassword(password,user.password, (err, isMatch)=>{
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign(user, 'mySecret',{
					expiresIn : 604800 //1 week
				});

	 			res.json({
					success : true,
					token : 'JWT '+ token,
					user: {
						id : user._id,
						name : user.name,
						email :user.email,
						username : user.username,
						designation:user.designation
					}
				});
			}else{
				return res.json({success:false, msg : "Wrong Password"});

			}
		});
	});
});

router.get('/profile',passport.authenticate('jwt',{session:false}), function(req,res,next){
	res.json({user : req.user});
});

module.exports = router;