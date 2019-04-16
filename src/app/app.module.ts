import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// animaciones
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// material
import { MaterialModule } from './materia.modeule';

// preparar y configurar el cliente http para leer el servicio
import { HttpClientModule } from '@angular/common/http';
import { DetalleAgendaComponent, DialogOAgendaOverview } from './detalle-agenda/detalle-agenda.component';
import { Page404Component } from './page404/page404.component';
import { AgendaComponent } from './agenda/agenda.component';

// servicios
import { DataApiService } from './services/data-api.service';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { EditAgendaComponent } from './edit-agenda/edit-agenda.component';
// formularios
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    DetalleAgendaComponent,
    DialogOAgendaOverview,
    Page404Component,
    NuevoUsuarioComponent,
    EditAgendaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule ,
  ],
  providers: [DataApiService],
  bootstrap: [AppComponent],
  entryComponents: [DialogOAgendaOverview]
})

export class AppModule {

}
