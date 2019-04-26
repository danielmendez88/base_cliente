import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent, ResetPasswordComponent]
})
export class AuthModule { }
