import { Component, OnInit, NgZone  } from '@angular/core';
// agregar nuevo
import { FileSaver } from 'file-saver';
import { ListaComisionService } from '../services/lista-comision.service';
import { Comisiones } from '../models/comisiones';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-documento-comision',
  templateUrl: './documento-comision.component.html',
  styleUrls: ['./documento-comision.component.css'],
})
export class DocumentoComisionComponent implements OnInit {

  // # SECCION: Reportes - declaracion
  pdfworker: Worker;
  cargandoPdf: any = {};
  errorEnPDF = false;
  pdfworkerComision: Worker;
  cargandoComision = false;
  errorPDFComision = false;
  comision: Comisiones;
  // # FIN SECCION

  constructor(
    // tslint:disable-next-line:variable-name
    private _ngZone: NgZone,
    private listaComisionService: ListaComisionService,

  ) {}

  ngOnInit() {

    // inicalizamos el objeto para los reportes con el web workers
    this.pdfworker = new Worker('../../web-workers/comisiones/comisiones.js ');

    const self = this;
    const $ngZone = this._ngZone;



    // tslint:disable-next-line:only-arrow-functions
    this.pdfworker.onmessage = function( evt ) {

      // Esto es un hack porque estamos fuera de contexto dentro del worker
      // Y se usa esto para actualizar alginas variables

      $ngZone.run(() => {
        console.log(evt);
        self.cargandoPdf[evt.data.no_comision] = false;
      });

      FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
      // open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF

    };


    // tslint:disable-next-line:only-arrow-functions
    this.pdfworker.onerror = function( e ) {
      $ngZone.run(() => {
        console.log(e);
        self.errorEnPDF = true;
        // self.cargandoPdf[error.tipoPedido] = false;
      });
      // console.log(e)
    };

    // tslint:disable-next-line:only-arrow-functions
    this.pdfworkerComision.onmessage = function( evt ) {
      // Esto es un hack porque estamos fuera de contexto dentro del worker
      // Y se usa esto para actualizar alginas variables

      $ngZone.run(() => {
        console.log(evt);
        self.cargandoComision = false;
      });

      FileSaver.saveAs( self.base64ToBlob( evt.data.base64, 'application/pdf' ), evt.data.fileName );
      // open( 'data:application/pdf;base64,' + evt.data.base64 ); // Popup PDF

    };

    // tslint:disable-next-line:only-arrow-functions
    this.pdfworkerComision.onerror = function( e ) {

      $ngZone.run(() => {
        console.log(e);
        self.errorPDFComision = true;
        // self.cargandoPdf[error.tipoPedido] = false;
      });

    // console.log(e)

    };

    // iniciamos la comision
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
      return new Blob([ buffer ], { type });
    }
}
