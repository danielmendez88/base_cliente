import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from '../services/data-api.service';
import { AngendaInterface } from '../models/agenda-interface';
// componente para trabajar los dialogos
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-detalle-agenda',
  templateUrl: './detalle-agenda.component.html',
  styleUrls: ['./detalle-agenda.component.css']
})
export class DetalleAgendaComponent implements OnInit {

  constructor(public rest: DataApiService, private router: Router , private route: ActivatedRoute, public dialog: MatDialog) { }

  private user: AngendaInterface = {
    nombre: '',
    apepaterno: '',
    apematerno: '',
    area: '',
    cargo: '',
    departamento: '',
    descripcion: '',
    direccion: '',
    email: '',
    foto: '',
  };

  ngOnInit() {
    const USER_ID = this.route.snapshot.params.id;
    console.log(USER_ID);
    this.getDetails(USER_ID);
  }

  getDetails(id) {
    this.rest.getUser(id).subscribe(user => (this.user = user, console.log(user)));
  }

  openDialog(id): void {
    console.log(id);
    const dialogRef = this.dialog.open(DialogOAgendaOverview, {
      width: '250px',
      data: { iduser: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'undefined') {
        this.rest.DeleteAgenda(result).subscribe(res => {
          this.router.navigate(['agenda/list']);
        }, (err) => {
          console.log(err);
        });
      }
      console.log('The dialog was closed', result);
    });
  }

}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-detalle-agenda',
  templateUrl: './dialogo-agenda-overview.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogOAgendaOverview {
  constructor(
    public dialogRef: MatDialogRef<DialogOAgendaOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    close(): void {
      this.dialogRef.close();
    }
}
