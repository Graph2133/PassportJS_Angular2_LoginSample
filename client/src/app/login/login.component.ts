import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;
  processing = false;
  previousUrl;
  constructor(
    private formBuilder:FormBuilder,
    private router: Router,
    private authService:AuthService ) {this.createForm(); }
  createForm(){
    this.form=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
   disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }
   enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }
google_login(){
  this.authService.loginViaGoogle().subscribe(data=>{
    console.log(data);
  });
}
  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    const user = {
      email: this.form.get('email').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    // Function to send login data to API
    this.authService.login(user).subscribe(data => {
      // Check if response was a success or error
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        console.log(data);
       
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message.message; // Set success message
        this.router.navigate(['/protected']);
        setTimeout(()=>{  this.router.navigate(['/protected']);},2000)
      
        // Function to store user's token in client local storage
        // After 2 seconds, redirect to dashboard page
     
      }
    });
  }
    
  ngOnInit() {
 
  }
}
