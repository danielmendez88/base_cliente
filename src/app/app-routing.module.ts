import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaComponent } from './agenda/agenda.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { DetalleAgendaComponent } from './detalle-agenda/detalle-agenda.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
<<<<<<< HEAD
// documento
import { DocumentoComisionComponent } from './documento-comision/documento-comision.component';

const routes: Routes = [
  { path: '', component: AgendaComponent},
  { path: 'agenda/list', component: AgendaComponent },
  { path: 'usuario/nuevo', component: NuevoUsuarioComponent},
  { path: 'usuario/:id', component: DetalleAgendaComponent},
  { path: 'documento/comision', component: DocumentoComisionComponent}, // documento comision ruta
  { path: '**', component: Page404Component},
=======
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: '', component: AgendaComponent},
  { path: 'comisiones/lista', component: AgendaComponent },
  { path: 'comisiones/nuevo', component: ComisionesComponent},
  { path: 'comisiones/:id', component: DetalleAgendaComponent},
  { path: '**', component: Page404Component}
>>>>>>> 16878b4c096ab768e306f6ddc6ec9e867cdd0f04
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
