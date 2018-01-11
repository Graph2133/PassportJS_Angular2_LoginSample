import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProtectedPageComponent } from "./protected-page/protected-page.component";
import { AuthGuard} from "./guard/auth.guard";
import { NotAuthGuard } from "./guard/notAuth.guard";
// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent 
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'protected',
    component: ProtectedPageComponent,
    canActivate:[AuthGuard]
  },
  { path: '**', component: LoginComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }