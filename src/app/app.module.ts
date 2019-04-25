import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './Material/materia.module';
import { AgendaComponent } from './agenda/agenda.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { DetalleAgendaComponent, DialogOAgendaOverview } from './detalle-agenda/detalle-agenda.component';
import { EditAgendaComponent } from './edit-agenda/edit-agenda.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { Page404Component } from './page404/page404.component';
import { DataApiService } from './services/data-api.service';
// formularios
import { DocumentoComisionComponent } from './documento-comision/documento-comision.component';
import { ComisionesListaComponent, DialogUploadFile } from './comisiones-lista/comisiones-lista.component';


@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    DetalleAgendaComponent,
    DialogOAgendaOverview,
    Page404Component,
    NuevoUsuarioComponent,
    EditAgendaComponent,
    DocumentoComisionComponent,
    ComisionesComponent,
    ComisionesListaComponent,
    DialogUploadFile,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [
    DataApiService,
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogOAgendaOverview, DialogUploadFile]
})

export class AppModule {

}
