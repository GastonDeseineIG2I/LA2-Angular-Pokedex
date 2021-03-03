import { Injectable } from '@angular/core';
import {LoginResponse} from '../models/loginResponse.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/auth';
  logged = false;
  loginResponse: LoginResponse;

  constructor(private http: HttpClient) { }

  login(email: string, pass: string): Observable<LoginResponse>{
    if (email && pass){
      return this.http.post<LoginResponse>(this.loginUrl + '/login', {
        email,
        password: pass
      }).pipe(tap(loginResponse => {
        if (loginResponse.access_token) {
          this.logged = true;
          this.loginResponse = loginResponse;
        }
      }));
    }
  }

  logout(): void {
    this.logged = false;
    this.loginResponse = null;
  }

  isLogged(): boolean {
    return this.logged;
  }
}
