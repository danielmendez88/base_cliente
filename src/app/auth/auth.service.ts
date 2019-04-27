import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { User } from './models/user';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();  
  constructor(private http: HttpClient, private router: Router) {   }
  

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuth(): boolean {
    
    return !!this.getToken();
  }


  logIn(email: string, password: string):Observable<any> {
    const url = `${environment.API_PATH}/login`;
    return this.http.post<User>(url, { email, password}).pipe(
      map( (response) => {
        console.log(response.token);
        if(response.token){
          
          localStorage.setItem('token', response.token);
          localStorage.setItem('nombre', response.nombre);
          localStorage.setItem('id', response.id);
          this.authChange.next(true);
        }
        return response;
      }
    ));
  }

  signUp(payload) {
    const url = `${environment.API_PATH}/signup`;
    return this.http.post<User>(url,payload).pipe(
      map( (response) => {
        if(response.token){
          localStorage.setItem('token', response.token);
          this.authChange.next(true);
        }
        return response;
      }
    ));
  }

  forgotPassword(email: string):Observable<any> {
    const url = `${environment.API_PATH}/forgot-password`;
    return this.http.post<any>(url, { email });
  }

  resetPassword(email:string, password: string, token: string):Observable<any> {
    const url = `${environment.API_PATH}/reset-password`;
    return this.http.post<any>(url, {email, password, token}).pipe(
      map( (response) => {
        if(response.token){
          localStorage.setItem('token', response.token);
          this.authChange.next(true);
        }
        return response;
      }
    ));
  }

  logout() {
    //this.user = null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    this.authChange.next(false);
    this.router.navigate(['/']);
    
  }
}
