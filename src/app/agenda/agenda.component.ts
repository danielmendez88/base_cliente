import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { DataApiService } from '../services/data-api.service';
import { Router } from '@angular/router';
import { AngendaInterface } from '../models/agenda-interface';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apepaterno', 'apematerno', 'cargo', 'detalle'];

  @ViewChild(MatSort) sort: MatSort;

  directorio: AngendaInterface[];
  isLoading: true;
  dataSource;

  constructor(private dataApi: DataApiService, private router: Router) { }

  ngOnInit() {
    this.getListAgenda();
  }

  getListAgenda() {
    this.dataApi.getAllAgenda().subscribe(response => {
      this.directorio = response;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
  }

  editUser(id) {
    this.router.navigate(['usuario/' + id]);
  }

}
