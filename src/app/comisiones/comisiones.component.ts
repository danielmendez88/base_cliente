import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray, FormBuilder, NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { longStackSupport } from 'q';

import * as _moment from 'moment';

import { SharedService } from 'src/app/shared/shared.service';

import { ComisionApiService } from '../services/comision-api.service';
import { ListaComisionService } from '../services/lista-comision.service';

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

  ultimoID:number = 0;
  defaultDate = new Date;
  isLoadingResults = false;
  total: number;
  checked: boolean = true;
  @ViewChild('importes') importes:ElementRef;
  @ViewChild('cuota') cuota:ElementRef;
  @ViewChild('dias') dias:ElementRef;
  fechaInicio:any;
  fechaTermino:any;
  //@Output() public eventoImporte: EventEmitter = new EventEmitter();
  form_lugares_comision: any;
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    public comision: ComisionApiService,
    public router: Router,
    private sharedService: SharedService,
    private listaComisiones: ListaComisionService
    ) {
  }
  
  ngOnInit() {

    this.generarNoComision();


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
      'no_comision':                    new FormControl ('',[Validators.required]),
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

  }

  generarNoComision(){

    this.listaComisiones.getAllComisiones().subscribe(res => {

      let fechaActual = _moment(this.defaultDate).format('YYYY/MM/D');
      this.ultimoID = res.pop().id + 1;
      this.formulario.controls.no_comision.setValue('IV/'+fechaActual+'/'+this.ultimoID);

    });

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

          this.crearpdf(res[0]);    

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

crearpdf(valor:any)
{

  var sourceData = valor;
var bodyData = [];

sourceData.lugares_comision.forEach(element => {
  var dataRow = [];
  dataRow.push(element.sede);
  dataRow.push(element.fecha_inicio);
  dataRow.push(element.fecha_termino);
  dataRow.push(element.cuota_diaria);
  dataRow.push(element.total_dias);
  dataRow.push(element.importe);

  bodyData.push(dataRow);
});



  var docDefinition = {
    content: [
      {
        stack: [
          // cabecera del documento
          'GOBIERNO CONSTITUCIONAL DEL ESTADO DE CHIAPAS',
          {text: 'INSTITUTO DE SALUD', style: 'subheader'},
          {text: 'FORMATO ÚNICO DE COMISIÓN', style: 'subheader1'}
        ],
        style: 'header'
      },
      {
        // tslint:disable-next-line:max-line-length
        image: 'escudo',
        width: 85,
        heigth: 90,
        margin: [ 255, -15, -30, 0] // margen left, top, right, bottom
      },
      {
        // creacion de la tabla
        style: 'table',
        color: '#444',
        table: {
          widths: [45 , 45 , 45 ],
          body: [
            // tabla que se encuentra de lado superior derecho
            [{text: 'NÚMERO DE MEMORANDUM', style: 'tableHeader', colSpan: 3, alignment: 'center'}, {}, {}],
            [{text: valor.no_memorandum, style: 'tableHeader', alignment: 'center', colSpan: 3}, {}, {}],
            [{text: 'NÚMERO DE COMISIÓN', style: 'tableHeader', alignment: 'center', colSpan: 3}, {}, {}],
            [{text: 'UAA',  style: 'rows'}, {text: valor.no_comision,  style: 'rows'}, {text: '2017',  style: 'rows'}],
            [{text: 'Día',  style: 'rows'}, {text: 'Mes',  style: 'rows'}, {text: 'Año',  style: 'rows'}],
            [{text: '29',  style: 'rows'}, {text: '04',  style: 'rows'}, {text: '2019',  style: 'rows'}],
          ]
        }

      },
      {
        // tabla cuerpo del documento
        style: 'body_table',
        color: '#444',
        table: {
          widths: [ 139 , 'auto', 'auto', 'auto', 'auto', 'auto',
          'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          headerRows: 2,
          body: [
            [{text: 'ORGANO RESPONSABLE', style: 'theader', colSpan: 19},
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{text:valor.nombre_subdepartamento, style: 'theader' , colSpan: 19},
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            [{text: 'CLAVE PRESUPUESTARIA:', rowSpan: 2 , style: 'tbody'},
            {text: 'CA', style: 'tbody' }, {text: 'UR', style: 'tbody'}, {text: 'F', style: 'tbody'}, {text: 'FU', style: 'tbody'},
            {text: 'SF', style: 'tbody'}, {text: 'SSF', style: 'tbody'}, {text: 'PS', style: 'tbody'},
            {text: 'PP', style: 'tbody'}, {text: 'PE', style: 'tbody'}, {text: 'AI', style: 'tbody'},
            {text: 'PT', style: 'tbody'}, {text: 'Mpio', style: 'tbody'}, {text: 'TG', style: 'tbody'},
            {text: 'FF', style: 'tbody'}, {text: 'DG', style: 'tbody' },
            {text: 'SFF', style: 'tbody'}, {text: 'CP', style: 'tbody'}, {text: 'DM', style: 'tbody'}],
            [{text: '', style: 'tbody'}, {text: '', style: 'tbody'}, {text: '', style: 'tbody'},
            {text: '', style: 'tbody'}, {text: '', style: 'tbody'}, {text: '', style: 'tbody'},
            {text: '', style: 'tbody'}, {text: '', style: 'tbody'}, {text: '', style: 'tbody'},
            {text: '', style: 'tbody'}, {text: '', style: 'tbody'}, {text: '', style: 'tbody'},
            {text: '', style: 'tbody'}, {text: '', style: 'tbody'}, {text: '', style: 'tbody'},
            {text: '', style: 'tbody'}, {text: '', style: 'tbody'}, {text: '2019', style: 'tbody'}, {text: '', style: 'tbody'}],
            [
              {text: 'NOMBRE DEL PROYECTO:', style: 'tbody'},
              {text: valor.nombre_proyecto, style: 'tbody_land', colSpan: 18},
              {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
            ]
          ]
        }
      },
      {
        // generar parte de la tabla
        style: 'body_tableII',
        color: '#444',
        table: {
          widths: [160, 160, 76, 75],
          body: [
            [
              {border: [true, false, true, true], text: 'NOMBRE COMISIONADO:', style: 'tbody'},
              {border: [true, false, true, true], text: 'CATEGORÍA', style: 'tbody'},
              {border: [true, false, true, true], text: 'R.F.C.', style: 'tbody'},
              {border: [true, false, true, true], text: 'Teléfono y Ext', style: 'tbody'}
            ],
            [
             {text: valor.nombre_comisionado, style: 'tbodytext'},
             {text: valor.categoria, style: 'tbodytext'},
             {text: valor.rfc, style: 'tbodytext'},
             {text: valor.telefono, style: 'tbodytext'}
            ],
            [
              {text: 'MOTIVO DE LA COMISIÓN', style: 'tbody', colSpan: 4},
              {}, {}, {}
            ],
            [
              // tslint:disable-next-line:max-line-length
              {text: valor.motivo_comision,
              style: 'tbodytext', colSpan: 4, rowSpan: 3},
              {}, {}, {}
            ],
            [
              {}, {}, {}, {}
            ],
            [
              {}, {}, {}, {}
            ],
          ]
        }
      },
      {
        // generar parte de la tabla
        style: 'body_tableII',
        color: '#444',
        table: {
          widths: [160, 65, 65, 60, 48, 55],
          body: [
            [
              { border: [true, false, true, true], text: 'Lugar (es) de Comisión', style: 'tbody', rowSpan: 2},
                { border: [true, false, true, true], text: 'Periodo', style: 'tbody', colSpan: 2},
                {},
                { border: [true, false, true, true], text: 'Cuota Diaria de Viáticos', style: 'tbody', rowSpan: 2},
                { border: [true, false, true, true], text: 'Total en Días', style: 'tbody', rowSpan: 2},
                { border: [true, false, true, true], text: 'Importe', style: 'tbody', rowSpan: 2}
            ],
            [
              {},
              {border: [true, false, false, true],text: 'Inicio', style: 'tbody'},
              {border: [true, false, true, true],text: 'Término', style: 'tbody'},
              {}, {}, {}
            ],
            
          ]
        }
      },
      {
        
        // generar tabla para lugares comision
        style: 'body_tableII',
        color: '#444',
        table: {
          widths: [160, 65, 65, 60, 48, 55],
          body: bodyData
        }
      },

      {
        // generar parte de la tabla
        style: 'body_tableII',
        color: '#444',
        table: {
          widths: [160, 65, 65, 60, 48, 55],
          body: [
            [
              {border: [true, false, true, true],text: 'Total: $', style: 'tbodyTotal', colSpan: 5},
                {}, {}, {}, {},
                {border: [true, false, true, true],text: valor.total, style: 'tbodyTotal'}],
            
          ]
        }
      },
      {
        // tabla
        style: 'body_tableII',
        color: '#444',
        table:
        {
          widths: [ 244, 245],
          body:
          [
            [
              {border: [true, false, true, true], text: 'FUNCIONARIO QUE AUTORIZA LA COMISIÓN', style: 'tbody'},
              {border: [true, false, true, true], text: 'ÁREA ADMINISTRATIVA', style: 'tbody'}
            ],
            [
              {text: '\n\n\n LIC. JAVIER ENRIQUE LÓPEZ RUÍZ \n DIRECTOR DE PLANEACIÓN Y DESARROLLO \n nombre, cargo y Firma'
              , style: 'tbody', rowSpan: 2},
              {text: '\n\n\n LIC. ALMA BRENDA GORDILLO SANCHEZ \n SUBDIRECTORA DE RECURSOS FINANCIEROS \n Nombre y Firma'
              , style: 'tbody', rowSpan: 2}
            ],
            [
              {},
              {}
            ],
            [
              {text: 'IMPORTE DE LA COMISIÓN Y RECIBOS', style: 'tbody', colSpan: 2},
              {}
            ]
          ]
        }
      },
      {
        // generar parte de la tabla
        style: 'body_tableII',
        color: '#444',
        table:
        {
          widths: [160, 91, 110, 110],
          body:
          [
            [
              {border: [true, false, true, true], text: 'DESCRIPCIÓN', style: 'tbody'},
              {border: [true, false, true, true], text: 'IMPORTE', style: 'tbody'},
              {border: [true, false, true, true], text: 'MEDIO DE TRANSPORTE', style: 'tbody', colSpan: 2},
              {}
            ],
            [
              {
                ul:
                [
                  'combustibles',
                  'fletes y maniobras',
                  'peaje',
                  'pasajes Nacionales',
                  'viáticos Nacionales',
                  'viáticos en el Extranjero',
                  'pasajes Internacionales'
                ],
                style: 'tbody_land'
              },
              {
                type: 'none',
                ul:
                [
                  valor.total_combustible,
                  valor.total_fletes_mudanza,
                  valor.peaje,
                  valor.total_pasajes_nacionales,
                  valor.total_viaticos_nacionales,
                  valor.total_viaticos_extranjeros,
                  valor.total_pasajes_internacionales
                ],
                style: 'tbodyTotal'
              },
              {text: '', colSpan: 2}
            ],
            [
              {style: 'tbodyTotal', text: 'SUMA:'},
              {style: 'tbodyTotal', text: valor.total},
              {style: 'tbodyTotal', text: 'BUENO POR:'},
              {style: 'tbody', text: valor.total}
            ],
            [
              // tslint:disable-next-line:max-line-length
              {style: 'tbodytext', text: 'RECIBÍ DEL INSTITUTO DE SALUD LA CANTIDAD DE: MIL TRESCIENTOS OCHENTA Y SEIS PESOS 00/100 M.N. \n POR CONCEPTO DE: VIATICOS', colSpan: 4},
              {}, {}, {}
            ]
          ]
        }
      },
      {
        // ultima tabla
        style: 'body_tableII',
        color: '#444',
        table:
        {
          widths: [245, 244],
          body:
          [
            [
              // tslint:disable-next-line:max-line-length
              {border: [true, false, true, true], text: '\n\n Tuxtla Gutiérrez, Chiapas\n 29 de abril del 2019\n\n Lugar y Fecha', style: 'tbody'},
              // tslint:disable-next-line:max-line-length
              {border: [true, false, true, true], text: '\n\n Comisionado \n\n '+valor.nombre_comisionado+'\n'+valor.categoria+'\n\n Nombre, Cargo y Firma\n', style: 'tbody'}
            ]
          ]
        }
      },
      {
        // tslint:disable-next-line:max-line-length
        text: '\n DECLARO BAJO PROTESTA DE DECIR VERDAD, QUE LOS DATOS CONTENIDOS EN ESTE INFORME SON VERIDICOS Y MANIFIESTO TENER CONOCIMIENTO DE LAS SANCIONES QUE SE APLICARÁN EN CASO CONTRARIO\n\n SE LES INFORMA QUE CUENTA CON SALDO EN LA CLAVE PRESUPUESTAL; SIN EMBARGO LA SOLICITUD DEL OFICIO DE COMISIÓN QUEDA BAJO ESTRICTA RESPONSABILIDAD DEL TITULAR QUE AUTORIZA LA COMSIÓN, SEGÚN EL ART.10 DE LAS NORMAS Y TARIFAS DE VIÁTICOS Y PASAJES.',
        style: ['quote', 'small']
      }
    ],
    images:
    {
      // tslint:disable-next-line:max-line-length
      escudo: 'data:image/png;base64,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'
    },
    styles: {
      header: {
        fontSize: 9,
        alignment: 'left',
        margin: [15, 10, 160, -30] // margenes left, top, right, bottom
      },
      subheader: {
        fontSize: 10,
        aligment: 'center',
        margin: [70, 7, 0, 0], // margenes left, top
        bold: true,
      },
      subheader1: {
        fontSize: 10,
        margin: [50, 5, 0, 0] // margenes left
      },
      tableHeader: {
        bold: true,
        fontSize: 8,
        color: 'black'
      },
      table: {
        margin: [ 353, -40, -20, -15]
      },
      rows: {
        fontSize: 8,
        alignment: 'center',
      },
      body_table: {
        margin: [8, 15, 10, 0] // margen left, top, right, bottom
      },
      body_tableII: {
        margin: [8, 0, 10, 0] // margen left, top, right, bottom
      },
      theader: {
        // clase para maquetar el contenido de la tabla principal
        fontSize: 8,
        bold: true,
        alignment: 'center',
      },
      tbody: {
        fontSize: 8,
        bold: true,
        alignment: 'center',
      },
      tbodyTotal: {
        fontSize: 8,
        bold: true,
        alignment: 'right'
      },
      tbody_land: {
        fontSize: 8,
        bold: true,
        alignment: 'left'
      },
      tbodytext: {
        fontSize: 8,
        bold: true,
        alignment: 'left',
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 5,
        margin: [8, 2, 0, 0] // margen left, top, right, bottom
      }
    }
  
  }
    
  const pdf = pdfMake.createPdf(docDefinition).open();
  //pdfMake.download(pdf);

}

}
