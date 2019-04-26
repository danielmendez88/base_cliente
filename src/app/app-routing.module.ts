import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import inicio
import { WelcomeComponent } from "./welcome/welcome.component";
//imports para login
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { GuessGuard } from './auth/guess.guard';

import { AgendaComponent } from './agenda/agenda.component';
import { ComisionesListaComponent } from './comisiones-lista/comisiones-lista.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { DetalleAgendaComponent } from './detalle-agenda/detalle-agenda.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { Page404Component } from './page404/page404.component';



const routes: Routes = [
<<<<<<< HEAD
  { path: '', component: AgendaComponent},
  { path: 'comisiones/list', component: ComisionesListaComponent },
  { path: 'comisiones/nuevo', component: ComisionesComponent},
  { path: 'comisiones/:id', component: DetalleAgendaComponent},
=======
  //{ path: '', component: WelcomeComponent },//pantalla de inicio
  { path: '', component: LoginComponent ,canActivate: [GuessGuard]},//login 
  { path: 'agenda', component: AgendaComponent, canActivate: [GuessGuard]},
  { path: 'comisiones/list', component: ComisionesListaComponent , canActivate: [GuessGuard]}, // comisiones lista
  { path: 'comisiones/nuevo', component: ComisionesComponent, canActivate: [GuessGuard]},
  { path: 'comisiones/:id', component: DetalleAgendaComponent, canActivate: [GuessGuard]},
>>>>>>> ac994fae97c746056d483ae336d504e208a5aae0
  { path: '**', component: Page404Component},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, GuessGuard]
})
export class AppRoutingModule { }
