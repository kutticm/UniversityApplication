import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../course.service';
import {Course} from '../../course';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../user';
import {Student} from '../../student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  courses : Course[];
  user :User;
  students : Student[];
  student : Student;

  constructor(
  private courseService : CourseService,
	private authService:AuthService, 
 	 private router :Router
  ) { }

  	ngOnInit(){
		this.courseService.getCourses()
			.subscribe(courses => this.courses=courses);

		this.authService.getProfile().subscribe(profile =>{
  			this.user = profile.user;

  		},
  		err =>{
  			console.log(err);
  			return false;
  		});	
	}

  onRegisterCourse(id){
    console.log('registerCourse');
  }

}
