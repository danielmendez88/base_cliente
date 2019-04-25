import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { Router } from '@angular/router';

import { AngendaInterface } from '../models/agenda-interface';
import { DataApiService } from '../services/data-api.service';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  // displayedColumns: string[] = ['no_comision', 'fecha', 'apematerno', 'motivo_comision'];

  @ViewChild(MatSort) sort: MatSort;

  // directorio: AngendaInterface[];
  isLoading: true;
  dataSource;

  constructor(private dataApi: DataApiService, private router: Router) { }

  ngOnInit() {
    this.getListaComisiones();
  }

  getListaComisiones() {
    this.dataApi.getAllAgenda().subscribe(response => {
      // this.comisiones = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
  }

  editUser(id) {
    this.router.navigate(['comisiones/' + id]);
  }

}
