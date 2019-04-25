import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngendaInterface } from '../models/agenda-interface';

const URL_API = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor( private http: HttpClient) { }
  agenda: Observable<any>;
  // interface
  public Directorio: AngendaInterface = {
    id: null,
    nombre: '',
    apepaterno: '',
    apematerno: '',
    area: '',
    cargo: '',
    departamento: '',
    descripcion: '',
    direccion: '',
    email: '',
    foto: ''
  };

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type' : 'application/json'
    })
  };



  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getAllAgenda(): Observable<any> {
    return this.http.get(URL_API + 'comisiones', this.httpOptions).pipe(
      map(this.extractData));
  }

  DeleteAgenda(id): Observable<any> {
    return this.http.delete(URL_API + 'comisiones/' + id, this.httpOptions);
  }

  // obtenemos los datos de un sólo usuario que se encuentra registrado
  getUser(id): Observable<any> {
    return this.http.get(URL_API + 'comisiones/' + id, this.httpOptions).pipe( map(this.extractData));
  }

  // insertar un nuevo registro
  saveAgenda(usuario: AngendaInterface): Observable<any> {
    return this.http.post<AngendaInterface>(URL_API + 'comisiones', usuario, this.httpOptions)
    .pipe(map(data => data));
  }

}
