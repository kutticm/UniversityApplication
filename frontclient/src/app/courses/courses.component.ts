import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';
import {Course} from '../course';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../user';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CourseService]
})
export class CoursesComponent implements OnInit{

	courses : Course[];
	course : Course;
	teacher_name : string;
	course_name : string;
	start_time : string;
	end_time : string;
	user: User;

	constructor(private courseService : CourseService,
	private authService:AuthService, 
 	 private router :Router) { }

	addCourse(){
		const newCourse = {
			teacher_name : this.user.name,
			course_name : this.course_name,
			start_time : this.start_time,
			end_time : this.end_time
		}
		this.courseService.addCourse(newCourse)
			.subscribe(course => {
				this.courses.push(course);
			});
		this.courseService.getCourses()
			.subscribe(courses => this.courses=courses);
	}
	
	deleteCourse(id:any){
		var courses = this.courses;
		this.courseService.deleteCourse(id)
			.subscribe(data => {
				if(data.m==1){
					for(var i=0;i< courses.length;i++){
						if(courses[i]._id == id){
							courses.splice(i,1);
						}
					}
				}
			});
		this.courseService.getCourses()
			.subscribe(courses => this.courses=courses);
	}

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
}