import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms'
 
import { HttpModule} from '@angular/http'
 
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService} from "./auth.service";
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule} from './app-routing.module';
import { JsonpModule } from '@angular/http';
import { ProtectedPageComponent } from './protected-page/protected-page.component';
import { AuthGuard} from "./guard/auth.guard";
import { NotAuthGuard } from "./guard/notAuth.guard";
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    ProtectedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [AuthService,AuthGuard,NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
