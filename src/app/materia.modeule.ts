import {MatButtonModule, MatCheckboxModule, MatToolbarModule} from '@angular/material';
import { NgModule } from '../../node_modules/@angular/core';
// iconos
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
// tabla
import {MatTableModule} from '@angular/material/table';
// formulario
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// CARD
import {MatCardModule} from '@angular/material/card';
// dialogo
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule
  ],
})
export class MaterialModule { }
