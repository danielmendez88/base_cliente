import { Component, OnInit, OnDestroy, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

import { Subscription } from 'rxjs';

import { EventEmitter } from 'protractor';
@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css'],
  providers:[{
    provide: MAT_STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true}
  }]
})
export class ComisionesComponent implements OnInit {

  total;
  @ViewChild('importes') importes:ElementRef;
  @ViewChild('cuota') cuota:ElementRef;
  @ViewChild('dias') dias:ElementRef;

  //@Output() public eventoImporte: EventEmitter = new EventEmitter();

  form_lugares_comision: any;
  
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.formulario = new FormGroup({

      'motivo_comision':                new FormControl ('', [Validators.required]),
      'no_memorandum':                  new FormControl ('', [Validators.required]),
      'no_comision':                    new FormControl ('', [Validators.required]),
      'nombre_proyecto':                new FormControl ('', [Validators.required]),
      'es_vehiculo_oficial':            new FormControl ('', [Validators.required]),
      'total':                          new FormControl ('', [Validators.required]),
      'tipo_comision':                  new FormControl ('', [Validators.required]),
      'placas':                         new FormControl (''),
      'modelo':                         new FormControl (''),
      'status_comision':                new FormControl ('', [Validators.required]),
      'fecha':                          new FormControl ('', [Validators.required]),
      'total_peaje':                    new FormControl (''),
      'total_combustible':              new FormControl (''),
      'total_fletes_mudanza':           new FormControl (''),
      'total_pasajes_nacionales':       new FormControl (''),
      'total_viaticos_nacionales':      new FormControl ('', [Validators.required]),
      'total_viaticos_extranjeros':     new FormControl (''),
      'total_pasajes_internacionales':  new FormControl (''),
      'nombre_subdepartamento':         new FormControl ('', [Validators.required]),
      'organo_responsable_id':          new FormControl ('', [Validators.required]),
      'plantilla_personal_id':          new FormControl ('', [Validators.required]),
      'lugares_comision':               new FormArray([
        
        this.fb.group({
          sede:           ['', [Validators.required]],
          fecha_inicio:   ['', [Validators.required]],
          fecha_termino:  ['', [Validators.required]],
          cuota_diaria:   ['', [Validators.required]],
          total_dias:     ['', [Validators.required]],
          importe: [''],
          total: [''],

        })
      ])
    });

    this.form_lugares_comision = {
      sede:         ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_termino:['', [Validators.required]],
      cuota_diaria: ['', [Validators.required]],
      total_dias:   ['', [Validators.required]],
      importe: [''],
      total: [''],
    };




  }

  agregar_form_array(modelo: FormArray, formulario) {
    (<FormArray>modelo).push(this.fb.group(formulario));

    console.log(this.formulario.value);
  }

  quitar_form_array(elemento, i: number) {
    elemento.splice(i, 1);
    //modelo.removeAt(i);
  }

  generarImporte(importes,i){

    console.log(importes,i);

    // let couta = this.cuota.nativeElement.value;
    // let dias = this.dias.nativeElement.value;

    // let importes = this.importes.nativeElement.value;


    // console.log(importes);

    this.formulario.controls.lugares_comision.value.forEach(element => {

     this.total = element.importe;
      
    });

      importes = this.total;
    
    




    //value="$ {{ dias.value * cuota.value | number:'3.2-5' }}"
   
  }

  generarTotal(){
    
    this.total = this.formulario.controls.lugares_comision; // sums to 100
    var sum = 0;

    for (var i = 0; i < this.total.lenght; i++) {
      sum += this.total[i]
    }

    console.log(sum);
  }

  

}
