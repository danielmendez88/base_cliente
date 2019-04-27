import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ComisionesComponent } from "../comisiones/comisiones.component";
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

  constructor() {}

    valor :any;

    ngAfterViewInit() {
      this.valor= this.datocomision.miguel;
      console.log("el valor del dato es:"+this.valor);
    }
    
   
  

}
