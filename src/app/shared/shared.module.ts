import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../Material/materia.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class SharedModule { }
