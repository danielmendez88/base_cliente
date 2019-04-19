import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// rutas
import { AgendaComponent } from './agenda/agenda.component';
import { DetalleAgendaComponent } from './detalle-agenda/detalle-agenda.component';
import { Page404Component } from './page404/page404.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
// documento
import { DocumentoComisionComponent } from './documento-comision/documento-comision.component';

const routes: Routes = [
  { path: '', component: AgendaComponent},
  { path: 'agenda/list', component: AgendaComponent },
  { path: 'usuario/nuevo', component: NuevoUsuarioComponent},
  { path: 'usuario/:id', component: DetalleAgendaComponent},
  { path: 'documento/comision', component: DocumentoComisionComponent}, // documento comision ruta
  { path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
