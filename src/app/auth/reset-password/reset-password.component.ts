import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email:string = null;
  token:string = null;
  resetFormGroup: FormGroup;
  isLoading:boolean = false;
  sended:boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sharedService: SharedService, private authService: AuthService ) { }

  ngOnInit() {
    this.resetFormGroup = new FormGroup({
      password: new FormControl('', { validators: [Validators.required]}),
      password_confirmation: new FormControl('', { validators: [Validators.required, this.validatorPasswordConfirmation] })
    });
    this.email = this.activatedRoute.snapshot.queryParamMap.get("e");
    this.token = this.activatedRoute.snapshot.queryParamMap.get("token");

    if(this.email == null || this.token == null){
      this.router.navigate(['/']);
    }
  }

  onSubmit(){

    this.isLoading = true;
    this.authService.resetPassword(this.email,this.resetFormGroup.value.password,this.token).subscribe(
      response => {
        this.isLoading = false;
        this.sended = true;
      }, errorResponse => {

        console.log(errorResponse);
        var errorMessage = "Ocurrió un error.";

        if(errorResponse.status == 409){
          errorMessage = errorResponse.error.message;
        }
        this.sharedService.showSnackBar(errorMessage, null, 3000);
        this.isLoading = false;
      }
    );
  }

  validatorPasswordConfirmation(control: AbstractControl): { [key:string]: boolean } {
    if(control.parent != null){
      if(control.value !== undefined && control.value !=  control.parent.controls["password"].value){
        return {"not_confirmed": true}
      }
    }
    return null;
  }

}
