import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Comisiones } from '../models/comisiones';
import { ComisionesComponent } from '../comisiones/comisiones.component';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ComisionApiService {


  public httpOptions = {
    headers: new HttpHeaders({
      'Content-type' : 'application/json'
    })
  };
  

  constructor(
    private http: HttpClient,
  )
  { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getComisiones (): Observable<Comisiones[]> {
    return this.http.get<Comisiones[]>(environment.base_url)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  
  getComision(id: number): Observable<Comisiones> {
    const url = `${environment.base_url}/${id}`;
    return this.http.get<Comisiones>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Comisiones>(`getProduct id=${id}`))
    );
  }
  
  addComision (comision:Comisiones): Observable<any> {
    return this.http.post<Comisiones>(environment.base_url + 'comisiones', comision, this.httpOptions)
    .pipe(
      tap((comision: Comisiones) => console.log(`added product w/ id=${ comision.id }`)),
      catchError(this.handleError<Comisiones>('addProduct'))
    );
  }

  
  updateComision (id, product): Observable<any> {
    const url = `${environment.base_url}/${id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  
  deleteComision (id): Observable<Comisiones> {
    const url = `${environment.base_url}/${id}`;
  
    return this.http.delete<Comisiones>(environment.base_url + 'comisiones/' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Comisiones>('deleteProduct'))
    );
  }
  
}
