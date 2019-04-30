import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ComisionesComponent } from "../comisiones/comisiones.component";
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

  datos;
  message:string;
  constructor(
    private data: ComisionesComponent
  ) {
    

  }

    valor :any;

    ngAfterViewInit() {
      this.valor= this.datocomision.miguel;
      console.log("el valor del dato es:"+this.valor);
    }
    
   
  

}
