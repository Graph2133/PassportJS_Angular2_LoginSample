import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService) { }
  onLogoutClick(){
   this.authService.logout().subscribe(data=>{
     console.log(data.message);
   })
  }
  ngOnInit() {
    setTimeout(()=>{ this.authService.isLoggedInFunc();},100)
    setTimeout(()=>{ this.authService.isLoggedInFunc();},100)
  }

}
