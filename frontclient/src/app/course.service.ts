import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Course} from './course';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {

  constructor(private http : Http) { }

  //retrieving courses

  getCourses(){
  	return this.http.get('http://localhost:5000/api/teacher/courses')
  		.map((res : Response) => res.json());
  }

  //adding Courses
  addCourse(newCourse){
  	var headers = new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('http://localhost:5000/api/teacher/course',newCourse,{headers:headers})
  		.map((res:Response) => res.json());
  }


  deleteCourse(id){
  	return this.http.delete('http://localhost:5000/api/teacher/course/'+id)
  		.map((res : Response) => res.json());
  }
}
