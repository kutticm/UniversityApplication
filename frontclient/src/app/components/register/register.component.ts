import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : String;
  username : String;
  email : String;
  password : String;
  designation : String;

  constructor(private validateService : ValidateService,
   private flashMessage: FlashMessagesService, 
  private authService:AuthService,
  private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
  	const user ={
  		name: this.name,
  		username: this.username,
  		email: this.email,
  		password: this.password,
  		designation: this.designation
  	}

  	if(!this.validateService.validateRegister(user)){
  		this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout : 3000});
  		return false;
  	}

  	if(!this.validateService.validateEmail(user.email)){
  		this.flashMessage.show('Please enter valid email', {cssClass: 'alert-danger', timeout : 3000});
  		return false;
  	}

  	//Register User
  	this.authService.registerUser(user).subscribe(data => {
  	if(data.success){
  		this.flashMessage.show('You are now registered and can login', {cssClass: 'alert-success', timeout : 3000});
      console.log('User registered');
      console.log('User designation'+ user.designation);
      if(user.designation == "Student"){
         console.log("Debugging"+data.user.username);
         console.log("Debugging"+data.user._id);
         const student = {
            student_id : data.user._id,
            student_name: data.user.username,
            stduent_courses:[]
        }
        this.authService.registerStudent(student).subscribe(data => {
          if(data.success){
            console.log('Success student added');
          }
          else{
            console.log('Student adding failed');
          }
        });
      }
      this.router.navigate(['/login']);
  	}else{
  		this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout : 3000});
  		this.router.navigate(['/register']);
      return false;
  	}
  	});
  }

}
