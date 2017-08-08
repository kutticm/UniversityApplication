import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {User} from '../user';
import {Student} from '../student'

@Injectable()
export class AuthService {
	
  authToken : any;
  user:User;
  designation : String ;
  student_id: String;
  constructor(private http:Http) { }
	registerUser(user){
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post('http://localhost:5000/api/user/register',user,{headers:headers}).map((res:Response) => res.json());
	}

	registerStudent(student){
		let headers =  new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post('http://localhost:5000/api/student/register',student,{headers:headers}).map((res:Response) => res.json());
	}

	registerStudentCourse(id){
		let headers =  new Headers();
		headers.append('Content-Type','application/json');
		return this.http.put('http://localhost:5000/api/student/registerCourse/'+this.student_id,{headers:headers}).map((res:Response) => res.json());
	}

	authenticateUser(user){
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post('http://localhost:5000/api/user/authenticate',user,{headers:headers}).map((res:Response) => res.json());
	}

	getProfile(){
		let headers = new Headers();
		this.loadToken();
		headers.append('Authorization',this.authToken);
		headers.append('Content-Type','application/json');
		return this.http.get('http://localhost:5000/api/user/profile',{headers:headers}).map((res:Response) => res.json());

	}

	storeUserData(token, user){
		localStorage.setItem('id_token',token);
		localStorage.setItem('user',JSON.stringify(user));
		this.authToken = token;
		this.user=user;
		this.designation = user.designation;
		this.student_id = user.id;
		console.log("Student id :"+this.student_id);
	}

	loadToken(){
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}


	loggedIn(){
		return tokenNotExpired('id_token');
	}

	isTeacher(){
		return (this.designation === 'Teacher');
	}

	isStudent(){
		return (this.designation === 'Student');
	}

	logout(){
		this.authToken=null;
		this.user=null;
		localStorage.clear();
	}
}
