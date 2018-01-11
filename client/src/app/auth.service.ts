import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
//import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:

import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch'
import { ResponseContentType } from '@angular/http';
import { Jsonp } from '@angular/http';
@Injectable()
export class AuthService {

  domain = "http://localhost:8080/"; // Development Domain - Not Needed in Production
  authToken;
  user;
  options;
  Result;
  isLoggedIn=false;
  constructor(
    private http: Http,
    private _jsonp: Jsonp 
  ) { }

  // Function to register user accounts
  registerUser(user) {
    return this.http.post(this.domain + 'register', user).map(res => res.json());
  }
  // Function to login user
  login(user) {
  
    return this.http.post(this.domain + 'login', user, { withCredentials: true }).map(res => res.json());
  }
  loginViaGoogle() {
    window.location.href = this.domain + 'auth/google';
    return this.http.get(this.domain + 'auth/google').map(res => res.json());
  }

  ifIsLog(){
   return  this.http.get(this.domain + 'isAuthenticated', { withCredentials: true }).map(res => res.json());
  }
  isLoggedInFunc(){
      this.ifIsLog().subscribe(data=>{
        console.log(data.success);
         this.isLoggedIn=data.success;
      })
        return this.isLoggedIn;
  }
 
  // Function to logout
  logout() {
    return this.http.get(this.domain + 'logout', { withCredentials: true }).map(res => res.json());
  }

}