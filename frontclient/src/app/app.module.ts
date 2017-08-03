import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import {CourseService} from './course.service';
import { HttpModule } from "@angular/http";
import { FormsModule }   from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';


import {ValidateService} from './services/validate.service'
import {AuthService} from './services/auth.service';

import {AuthGuard} from './guards/auth.guard';


const appRoutes:Routes = [
  {path : '', component : HomeComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'dashboard', component : DashboardComponent, canActivate:[AuthGuard]},
  {path : 'profile', component : ProfileComponent, canActivate:[AuthGuard]},
  {path : 'api/teacher/courses', component : CoursesComponent}

]
@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [CourseService,ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
