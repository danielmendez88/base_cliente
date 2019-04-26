import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ComisionLista } from '../models/comision-model';
// importar environment
import { environment } from '../../environments/environment';

// creamos una constante de las turas

@Injectable({
  providedIn: 'root'
})
export class ListaComisionService {

  // damos permisos a las opciones https
  public httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private https: HttpClient) { }


  // extraer los datos que nos regresan de la petición
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // obtener todos los registros de las comisiones
  getAllComisiones(): Observable<ComisionLista[]> {
    return this.https.get<ComisionLista[]>(environment.base_url + 'comisiones', this.httpOptions).pipe(
      tap(heroes => console.log('mostrar comisiones')));
  }
}
