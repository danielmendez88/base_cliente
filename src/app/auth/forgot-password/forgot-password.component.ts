import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  isLoading:boolean = false;
  sended:boolean = false;

  constructor( private sharedService: SharedService, private authService: AuthService ) { }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      email: new FormControl('',{ validators: [Validators.required, Validators.email] })
    });
  }

  onSubmit(){

    this.isLoading = true;
    this.authService.forgotPassword(this.forgotForm.value.email).subscribe(
      response => {
        this.isLoading = false;
        this.sended = true;
      }, error => {

        console.log(error);
        var errorMessage = "Ocurrió un error.";
        this.sharedService.showSnackBar(errorMessage, null, 3000);
        this.isLoading = false;
      }
    );
  }

}
