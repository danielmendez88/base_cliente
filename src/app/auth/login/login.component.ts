import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading:boolean = false;

  constructor(private router: Router, private sharedService: SharedService, private authService: AuthService ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',{ validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(){

    this.isLoading = true;
    this.authService.logIn(this.loginForm.value.email, this.loginForm.value.password ).subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['/comisiones/list']);
      }, error => {

        console.log(error);
        var errorMessage = "Error: Credenciales inválidas.";
        if(error.status != 401){
          errorMessage = "Ocurrió un error.";
        }
        this.sharedService.showSnackBar(errorMessage, null, 3000);
        this.isLoading = false;
      }
    );
  }

}
