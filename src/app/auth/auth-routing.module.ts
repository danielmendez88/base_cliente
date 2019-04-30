import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { GuessGuard } from './guess.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';




const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  declarations: [],
  providers: [GuessGuard]
})
export class AuthRoutingModule { }
