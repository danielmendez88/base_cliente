import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as _moment from 'moment';

import { SharedService } from 'src/app/shared/shared.service';

import { ComisionApiService } from '../services/comision-api.service';
// agregar filesaver
import { filesaver } from 'file-saver';




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

  pdfworker: Worker;
  cargandoPdf: any = {};
  cargandoComision = false;
  errorPDFComision = false;

  // tslint:disable-next-line:new-parens
  defaultDate = new Date;
  isLoadingResults = false;
  total: number;
  checked = true;
  @ViewChild('importes') importes: ElementRef;
  @ViewChild('cuota') cuota: ElementRef;
  @ViewChild('dias') dias: ElementRef;


  // @Output() public eventoImporte: EventEmitter = new EventEmitter();

  // tslint:disable-next-line:variable-name
  form_lugares_comision: any;

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    public comision: ComisionApiService,
    public router: Router,
    private sharedService: SharedService,
    private Ngzone: NgZone
    ) {
  }

  ngOnInit() {

    const fecha = _moment(this.defaultDate).format('YYYY-MM-D');

    // inicializamos el objeto worker
    this.pdfworker = new Worker('../../web-workers/comisiones.js');
    const self = this;
    const $ngZone = this.Ngzone;

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

    console.log(this.formulario.value);

    console.log(this.defaultDate);

    // tslint:disable-next-line:only-arrow-functions
    this.pdfworker.onmessage = function(evt) {
      // esto es un hack porque estamos fuera de contexto dentro del worker
      // y se utiliza para actualizar algunas variables
      $ngZone.run(() => {
        console.log(evt);
        self.cargandoComision = false;
      });
      filesaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName);
    };

    // tslint:disable-next-line:only-arrow-functions
    this.pdfworker.onerror = function( e ) {

      $ngZone.run(() => {
        console.log(e);
        self.errorPDFComision = true;
        // self.cargandoPdf[error.tipoPedido] = false;
      });

    };

  }

  // tslint:disable-next-line:use-life-cycle-interface
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

      this.total -= parseFloat(element.importe);

      this.formulario.controls.total.setValue(this.total);

      this.formulario.controls.total_viaticos_nacionales.setValue(this.total);


    });
    // modelo.removeAt(i);
  }


  generarTotal(){

    this.total = 0;

    this.formulario.controls.lugares_comision.value.forEach(element => {

      this.total += parseFloat(element.importe);

      this.formulario.controls.total.setValue(this.total);

      this.formulario.controls.total_viaticos_nacionales.setValue(this.total);

    });


    console.log(this.total);

  }

  changeValue(value) {

    console.log(value);
    this.checked = !value;

  }

  updateDate(value: any) {
    console.log(value.value);

    this.formulario.controls.fecha.setValue(_moment(value.start).format('D/MM/YYYY'));



  }

  onSubmit(formComision: NgForm) {

    this.isLoadingResults = true;

    this.comision.addComision(formComision.value)
      .subscribe(res => {
          // tslint:disable-next-line:no-string-literal
          let id = res['id'];

          this.isLoadingResults = false;
          this.formulario.reset();

          const Message = '¡Exito! Comision Registrada';

          this.sharedService.showSnackBar(Message, null, 7000);
          // this.router.navigate(['/comisiones/list']);
          try {
            const comisionImprimir = {

            };
            this.pdfworker.postMessage(JSON.stringify(comisionImprimir));
          } catch (error) {
            console.log(error);
          }

        }, (error) => {

          console.log(error);
          // tslint:disable-next-line:no-var-keyword
          var errorMessage = 'Error al Registrar Comision';

          if (error.status !== 200) {
            errorMessage = 'Ocurrió un error.';
          }
          this.sharedService.showSnackBar(errorMessage, null, 9000);
          this.isLoadingResults = false;
        });
  }

  base64ToBlob(base64, type) {
    const bytes = atob(base64);
    const len = bytes.length;
    const buffer = new ArrayBuffer( len );
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      // tslint:disable-next-line:no-bitwise
      view[i] = bytes.charCodeAt(i) & 0xff;
    }
    // tslint:disable-next-line:object-literal-shorthand
    return new Blob([ buffer ], { type: type });
  }


}
