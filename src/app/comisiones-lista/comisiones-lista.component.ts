import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ListaComisionService } from '../services/lista-comision.service';
import { ComisionLista } from '../models/comision-model';
// componente para trabajar los dialogos
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-comisiones-lista',
  templateUrl: './comisiones-lista.component.html',
  styleUrls: ['./comisiones-lista.component.css']
})
export class ComisionesListaComponent implements OnInit {
  isLoading = true;
  mode = 'indeterminate';

  displayedColumns: string[] = ['id', 'no_comision', 'no_memorandum', 'motivo_comision', 'upload'];
   // Asignar la data to la fuente de datos para la tabla a renderizar
  dataSource = new MatTableDataSource<ComisionLista>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private comisionList: ListaComisionService, public dialog: MatDialog) {}

  ngOnInit() {
    // llamar al metodo de comision donde se muestran el listado de comsiones
    this.getAllComisiones();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * getAllComisiones - metodo que obtiene todas las comisiones
   */
  public getAllComisiones() {
    this.comisionList.getAllComisiones()
    .subscribe(res => {
      this.isLoading = false;
      this.dataSource.data = res as ComisionLista[];
      console.log(res);
    },
    error => this.isLoading = false
    );
  }

  // dialogos
  uploadFile(id): void {
    console.log(id);
    const dialogref = this.dialog.open(DialogUploadFile, {
      width: '300px',
      data: { comisionid: id},
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

@Component({
  selector: 'app-comisiones-lista',
  templateUrl: './dialog-box-file-lista.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogUploadFile {
  constructor(
    public dialogref: MatDialogRef<DialogUploadFile>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    close(): void {
      this.dialogref.close();
    }
}
