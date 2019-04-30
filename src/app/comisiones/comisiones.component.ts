import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray, FormBuilder, NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import * as _moment from 'moment';

import { SharedService } from 'src/app/shared/shared.service';

import { ComisionApiService } from '../services/comision-api.service';


const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');

pdfMake.vfs = pdfFonts.pdfMake.vfs;




@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css'],
  providers:[
    {
    provide: MAT_STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true}
    },
  ]
})
export class ComisionesComponent implements OnInit {

  defaultDate = new Date;
  isLoadingResults = false;
  total: number;
  
  checked: boolean = true;
  @ViewChild('importes') importes:ElementRef;
  @ViewChild('cuota') cuota:ElementRef;
  @ViewChild('dias') dias:ElementRef;


  fechaInicio:any;
  fechaTermino:any;

  datos: any;

  //@Output() public eventoImporte: EventEmitter = new EventEmitter();

  form_lugares_comision: any;

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    public comision: ComisionApiService,
    public router: Router,
    private sharedService: SharedService
    ) {
  }

  ngOnInit() {

    var fecha = _moment(this.defaultDate).format('YYYY-MM-D');
    

    this.formulario = new FormGroup({


      'id':                             new FormControl (''),

      'nombre_comisionado':             new FormControl ('', [Validators.required]),
      'rfc':                            new FormControl ('', [Validators.required]),
      'categoria':                      new FormControl ('', [Validators.required]),
      'telefono':                       new FormControl ('', [Validators.required]),


      'user_id':                        new FormControl (1),
      'motivo_comision':                new FormControl ('', [Validators.required]),
      'no_memorandum':                  new FormControl ('', [Validators.required]),
      'no_comision':                    new FormControl ('', [Validators.required]),
      'nombre_proyecto':                new FormControl ('', [Validators.required]),
      'es_vehiculo_oficial':            new FormControl (''),
      'total':                          new FormControl ('', [Validators.required]),
      'tipo_comision':                  new FormControl ('CO'),
      'placas':                         new FormControl (''),
      'modelo':                         new FormControl (''),
      'status_comision':                new FormControl (0),
      'fecha':                          new FormControl ('', [Validators.required]),
      'total_peaje':                    new FormControl (0.00),
      'total_combustible':              new FormControl (0.00),
      'total_fletes_mudanza':           new FormControl (0.00),
      'total_pasajes_nacionales':       new FormControl (0.00),
      'total_viaticos_nacionales':      new FormControl ('', [Validators.required]),
      'total_viaticos_extranjeros':     new FormControl (0.00),
      'total_pasajes_internacionales':  new FormControl (0.00),
      'nombre_subdepartamento':         new FormControl ('', [Validators.required]),
      'organo_responsable_id':          new FormControl (1),
      'plantilla_personal_id':          new FormControl (1),
      'lugares_comision':               new FormArray([

        this.fb.group({
          sede:           ['', [Validators.required]],
          fecha_inicio:   ['', [Validators.required]],
          es_nacional:    [1],
          periodo:        [2019],
          termino:        [fecha],
          fecha_termino:  ['', [Validators.required]],
          cuota_diaria:   ['', [Validators.required]],
          total_dias:     ['', [Validators.required]],
          importe: [''],

        })
      ])
    });

    this.form_lugares_comision = {
      sede:         ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      es_nacional:    [1],
      periodo:        [2019],
      termino:        [fecha],
      fecha_termino:['', [Validators.required]],
      cuota_diaria: ['', [Validators.required]],
      total_dias:   ['', [Validators.required]],
      importe: [''],
    };

    console.log("valor de dias",  this.formulario.controls.lugares_comision['controls'][0]['controls']['total_dias'].value);


  }


  ngAfterViewInit() {
    this.defaultDate = new Date();
  }

  agregar_form_array(modelo: FormArray, formulario) {
    (<FormArray>modelo).push(this.fb.group(formulario));

    console.log(this.formulario.value);
  }

  quitar_form_array(elemento, i: number) {
    elemento.splice(i, 1);

    this.total = 0;

    this.formulario.controls.lugares_comision.value.forEach(element => {

      this.total-= parseFloat(element.importe);

      this.formulario.controls.total.setValue(this.total);

      this.formulario.controls.total_viaticos_nacionales.setValue(this.total);


    });
    //modelo.removeAt(i);
  }


  generarTotal(){

    this.total = 0;

    this.formulario.controls.lugares_comision.value.forEach(element => {

      this.total+= parseFloat(element.importe);

      this.formulario.controls.total.setValue(this.total);

      this.formulario.controls.total_viaticos_nacionales.setValue(this.total);

    });


    console.log(this.total);

  }

  changeValue(value) {

    console.log(value);
    this.checked = !value;

  }

  generarDias(index:number){

      let diferenciaDias = 0;


      this.fechaInicio =   _moment(this.formulario.controls.lugares_comision['controls'][index]['controls']['fecha_inicio'].value); 
      this.fechaTermino =  _moment(this.formulario.controls.lugares_comision['controls'][index]['controls']['fecha_termino'].value);


      diferenciaDias = parseInt(this.fechaTermino.diff(this.fechaInicio, 'days'));

      if(diferenciaDias < 0){

        this.formulario.controls.lugares_comision['controls'][index]['controls']['total_dias'].patchValue('');

        alert('Seleccione las fechas de comisión correctas');

        diferenciaDias = 0;
        this.formulario.controls.lugares_comision['controls'][index]['controls']['total_dias'].patchValue('');

      }
      else{
        this.formulario.controls.lugares_comision['controls'][index]['controls']['total_dias'].patchValue(diferenciaDias);
      }
    

  }

  onSubmit(formComision:NgForm) {

    this.isLoadingResults = true;

    this.comision.addComision(formComision.value)
      .subscribe(res => {

          console.log(res.data);

          this.isLoadingResults = false;
          //this.formulario.reset();


          var Message = "¡Exito! Comision Registrada";

          this.sharedService.showSnackBar(Message, null, 7000);
          //this.router.navigate(['/comisionPDF']);

        }, (error) => {

          console.log(error);
          var errorMessage = "Error al Registrar Comision";

          if(error.status != 200){
            errorMessage = "Ocurrió un error.";
          }
          this.sharedService.showSnackBar(errorMessage, null, 9000);
          this.isLoadingResults = false;
        });
  }

  
}
