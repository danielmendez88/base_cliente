import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from '../auth.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[{
    provide: MAT_STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true}
  }]
})
export class SignupComponent implements OnInit {
  isLoading:boolean = false;
  userFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  identityFormGroup: FormGroup;

  constructor(private router: Router, private sharedService: SharedService, private authService: AuthService ) { }

  ngOnInit() {
    this.userFormGroup = new FormGroup({
      nombre: new FormControl('',{ validators: [Validators.required] }),
      apellido_paterno: new FormControl('',{ validators: [Validators.required] }),
      apellido_materno: new FormControl('',{ }),
      email: new FormControl('',{ validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required]}),
      password_confirmation: new FormControl('', { validators: [Validators.required, this.validatorPasswordConfirmation] })
    });

    this.addressFormGroup = new FormGroup({
      calle: new FormControl('',{ }),
      numero_exterior: new FormControl('',{ }),
      numero_interior: new FormControl('',{ }),
      colonia: new FormControl('',{ }),
      codigo_postal: new FormControl('',{ }),

      pais: new FormControl('México',{ }),
      estado: new FormControl('Chiapas',{ }),
      municipio: new FormControl('Tuxtla Gutiérrez',{ })
    });

    this.identityFormGroup = new FormGroup({
      nacionalidad: new FormControl('M',{ }),
      curp: new FormControl('',{ }),
      rfc: new FormControl('',{ }),
      clave_elector: new FormControl('',{ }),
      informacion_veridica: new FormControl(false, { validators: [Validators.pattern('true')] }),
      acepto: new FormControl(false, { validators: [Validators.pattern('true')] })
    });

  }
  
  validatorPasswordConfirmation(control: AbstractControl): { [key:string]: boolean } {
    if(control.parent != null){
      if(control.value !== undefined && control.value !=  control.parent.controls["password"].value){
        return {"not_confirmed": true}
      }
    }
    return null;
  }

  onSubmit(stepper: MatStepper): void {
    const payload = {
      email: this.userFormGroup.value.email,
      password: this.userFormGroup.value.password,
      password_confirmation: this.userFormGroup.value.password,
      nombre: this.userFormGroup.value.nombre,
      apellido_paterno: this.userFormGroup.value.apellido_paterno,
      apellido_materno: this.userFormGroup.value.apellido_materno,
      calle: this.userFormGroup.value.calle,
      numero_exterior: this.userFormGroup.value.numero_exterior,
      numero_interior: this.userFormGroup.value.numero_interior,
      colonia: this.userFormGroup.value.colonia,
      codigo_postal: this.userFormGroup.value.codigo_postal,
      pais: this.userFormGroup.value.pais,
      estado: this.userFormGroup.value.estado,
      municipio: this.userFormGroup.value.municipio,
      nacionalidad: this.identityFormGroup.value.nacionalidad,
      curp: this.identityFormGroup.value.curp,
      rfc: this.identityFormGroup.value.rfc,
      clave_elector: this.identityFormGroup.value.clave_elector,
      acepto: this.identityFormGroup.value.acepto,
      informacion_veridica: this.identityFormGroup.value.informacion_veridica,
      g_recaptcha_response:'03AMGVjXhPlqMqm4XYdQn-EryDJrZ_cUzcMB88bUhl6ivCncnPf2EOjEx1633tVQ_wU9zTbs0bH43bWHc7s6nH4LKTdXaDQSdV3gOUbf5Lcf8X32EKOueROybuXO1rVLMAjWDv6qCTIuaW8D4Ew3LLOWAOkZ_Gs2o7TTOJ_rQmZLTbB49JjR2KMtFmTMzA_8f4LatfsWkaoTYBrH25Ygyb50JHDq9MEGoxdA5WB1WTbve_u-9imfoMe0aufCxuQRyCPf0INFIHd5fMeqRFhdCdOphNu84uc-sgj4VFaWzDre8YdfKfw5ghYLZEV_MUow3wtJr-euto2cV_C-S_HUG_UokoIENxOuWlAg'

    }

    this.isLoading = true;
    this.authService.signUp(payload).subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['/profile']);
      }, error => {
       
        var errorMessage = "Error de validación, verifique los campos marcados en rojo.";
        if(error.status == 409){
          this.userFormGroup.controls['email'].setErrors({'unique':true})
          stepper.previous();
          stepper.next();
          
        } else {
          errorMessage = "Ocurrió un error.";
        }
        this.sharedService.showSnackBar(errorMessage, null, 3000);
        this.isLoading = false;
      }
    )
    //this.store.dispatch(new SignUp(payload));
  }

}
