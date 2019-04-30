import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ComisionesComponent } from '../comisiones/comisiones.component';
import { NgForm } from '@angular/forms';
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-documento-comision',
  template: `
    miguel: {{miguel}}
    <app-comisiones></app-comisiones>
  `,
  styleUrls: ['./documento-comision.component.css']
})
export class DocumentoComisionComponent implements AfterViewInit {

  @ViewChild(ComisionesComponent) datocomision;

  // # SECCION: Reportes - declaracion
  pdfworker: Worker;
  cargandoPdf: any = {};
  errorEnPDF = false;
  pdfworkerComision: Worker;
  cargandoComision = false;
  errorPDFComision = false;
  // # FIN SECCION

  constructor(
    // tslint:disable-next-line:variable-name

  ) {}

    valor: any;

    ngAfterViewInit() {
      this.valor = this.datocomision.miguel;
      console.log('el valor del dato es:' + this.valor);
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
