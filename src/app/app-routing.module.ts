import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaComponent } from './agenda/agenda.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { DetalleAgendaComponent } from './detalle-agenda/detalle-agenda.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { Page404Component } from './page404/page404.component';
import { ComisionesListaComponent } from './comisiones-lista/comisiones-lista.component';

const routes: Routes = [
  { path: '', component: AgendaComponent},
  { path: 'comisiones/list', component: ComisionesListaComponent }, // comisiones lista
  { path: 'comisiones/nuevo', component: ComisionesComponent},
  { path: 'comisiones/:id', component: DetalleAgendaComponent},
  { path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
