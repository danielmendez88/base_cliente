import { Component, OnInit } from '@angular/core';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-documento-comision',
  templateUrl: './documento-comision.component.html',
  styleUrls: ['./documento-comision.component.css']
})
export class DocumentoComisionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const docDefinition = {
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
          // creacion de la tabla
          style: 'table',
          color: '#444',
          table: {
            widths: [50 , 50 , 50 ],
            body: [
              // tabla que se encuentra de lado superior derecho
              [{text: 'NÚMERO DE MEMORANDUM', style: 'tableHeader', colSpan: 3, alignment: 'center'}, {}, {}],
              [{text: 'DPD/1038/2017', style: 'tableHeader', alignment: 'center', colSpan: 3}, {}, {}],
              [{text: 'NÚMERO DE COMISIÓN', style: 'tableHeader', alignment: 'center', colSpan: 3}, {}, {}],
              [{text: 'UAA',  style: 'rows'}, {text: '',  style: 'rows'}, {text: '2017',  style: 'rows'}],
              [{text: 'Día',  style: 'rows'}, {text: 'Mes',  style: 'rows'}, {text: 'Año',  style: 'rows'}],
              [{text: '17',  style: 'rows'}, {text: '06',  style: 'rows'}, {text: '2017',  style: 'rows'}],
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
              [{text: 'Dirección de Planeación y Desarrollo / Dirección de Planeación y Desarrollo', style: 'theader' , colSpan: 19},
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
              {text: '', style: 'tbody'}, {text: '', style: 'tbody'}, {text: '2017', style: 'tbody'}, {text: '', style: 'tbody'}],
              [
                {text: 'NOMBRE DEL PROYECTO:', style: 'tbody'},
                {text: 'FORTALECER EL SISTEMA INTEGRAL DE INFORMACIÓN EN SALUD', style: 'tbody_land', colSpan: 18},
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
                { border: [true, false, true, true], text: 'NOMBRE COMISIONADO:', style: 'tbody'},
                {border: [true, false, true, true], text: 'CATEGORÍA', style: 'tbody'},
                {border: [true, false, true, true], text: 'R.F.C.', style: 'tbody'},
                {border: [true, false, true, true], text: 'Teléfono y Ext', style: 'tbody'}
              ],
              [
               {text: 'NUÑEZ GAMAS CHRISTIAN RODOLFO', style: 'tbodytext'},
               {text: 'JEFE DEL ÁREA DE INFORMÁTICA', style: 'tbodytext'},
               {text: 'NUGC800926-3Z2', style: 'tbodytext'},
               {text: '(961) 61 8 92 50', style: 'tbodytext'}
              ],
              [
                {text: 'MOTIVO DE LA COMISIÓN', style: 'tbody', colSpan: 4},
                {}, {}, {}
              ],
              [
                {text: 'ASISTIR A LA JURISDICCIÓN SANITARIA DE PALENQUE Y PICHUCALCO, CHIAPAS; PARA CAPACITAR AL PERSONAL DE DICHA JURISDICCIÓN CON EL PROGRAMA SIMBA LOS DÍAS 24 AL 26 DE MAYO DEL PRESENTE AÑO, RETORNANDO EL DÍA 26 DE MAYO AL TERMINO DE SUS ACTIVIDADES \n\n\n',
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
          // generar tabla
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
                {text: 'Inicio', style: 'tbody'},
                {text: 'Término', style: 'tbody'},
                {}, {}, {}
              ],
              [
                {text: 'PALENQUE, CHIAPAS \n PICHUCALCO, CHIAPAS', style: 'tbodytext'},
                {text: '24-MAY-2017 \n 24-MAY-2017', style: 'tbody'},
                {text: '24-MAY-2017 \n 24-MAY-2017', style: 'tbody'},
                {text: '693.00 \n 693.00', style: 'tbodyTotal'},
                {text: '1 \n 1', style: 'tbody'},
                {text: '693.00 \n 693.00', style: 'tbodyTotal'}
              ],
              [
                {text: 'Total: $', style: 'tbodyTotal', colSpan: 5},
                {}, {}, {}, {},
                {text: '1386.00', style: 'tbodyTotal'}
              ],
              [
                {text: 'NOTA: ESTA COMISIÓN DEBERÁ SER COMPROBADA EN CINCO DÍAS HABILES A SU TÉRMINO', style: 'tbody', colSpan: 6},
                {}, {}, {}, {}, {}
              ]
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
                    '0.00',
                    '0.00',
                    '0.00',
                    '0.00',
                    '1,386.00',
                    '0.00',
                    '0.00'
                  ],
                  style: 'tbodyTotal'
                },
                {text: '', colSpan: 2}
              ],
              [
                {style: 'tbodyTotal', text: 'SUMA:'},
                {style: 'tbodyTotal', text: '1,386.00'},
                {style: 'tbodyTotal', text: 'BUENO POR:'},
                {style: 'tbody', text: '1,386.00'}
              ],
              [
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
                {border: [true, false, true, true], text: '\n\n Tuxtla Gutiérrez, Chiapas\n 17 de Mayo del 2017\n\n Lugar y Fecha', style: 'tbody'},
                {border: [true, false, true, true], text: '\n\n Comisionado \n\n NUÑEZ GAMAS CHRISTIAN RODOLFO\n Jefe del departamento de informática\n\n Nombre, Cargo y Firma\n', style: 'tbody'}
              ]
            ]
          }
        },
        {
          text: '\n DECLARO BAJO PROTESTA DE DECIR VERDAD, QUE LOS DATOS CONTENIDOS EN ESTE INFORME SON VERIDICOS Y MANIFIESTO TENER CONOCIMIENTO DE LAS SANCIONES QUE SE APLICARÁN EN CASO CONTRARIO\n\n SE LES INFORMA QUE CUENTA CON SALDO EN LA CLAVE PRESUPUESTAL; SIN EMBARGO LA SOLICITUD DEL OFICIO DE COMISIÓN QUEDA BAJO ESTRICTA RESPONSABILIDAD DEL TITULAR QUE AUTORIZA LA COMSIÓN, SEGÚN EL ART.10 DE LAS NORMAS Y TARIFAS DE VIÁTICOS Y PASAJES.',
          style: ['quote', 'small']
        }
      ],
      styles: {
        header: {
          fontSize: 10,
          alignment: 'left',
          margin: [30, 0, 30, 0] // margenes left, top
        },
        subheader: {
          fontSize: 8,
          margin: [100, 0, 100, 0], // margenes left, top
        },
        subheader1: {
          fontSize: 8,
          margin: [80, 0, 0, 0] // margenes left
        },
        tableHeader: {
          bold: true,
          fontSize: 8,
          color: 'black'
        },
        table: {
          margin: [ 338, -40, -20, -15]
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
    };
    const pdf = pdfMake.createPdf(docDefinition).open();
    // download('formatoComision.pdf');
  }

}
