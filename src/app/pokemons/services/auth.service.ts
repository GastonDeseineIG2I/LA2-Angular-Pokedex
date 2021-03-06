import { Injectable } from '@angular/core';
import {LoginResponse} from '../models/loginResponse.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, pass: string): Observable<LoginResponse>{
    if (email && pass){
      return this.http.post<LoginResponse>(this.loginUrl + '/login', {
        email,
        password: pass
      }).pipe(tap(loginResponse => {
        if (loginResponse.access_token) {
          console.log(loginResponse);

          const expire = moment(new Date()).add(loginResponse.expires_in, 'seconds').format('DD/MM/YYYY HH:mm:ss');

          sessionStorage.setItem('token', loginResponse.access_token);
          sessionStorage.setItem('refresh_token', loginResponse.refresh_token);
          sessionStorage.setItem('expire', expire);
        }
      }));
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {

    const currentDate = moment();
    const expirationDate = moment(sessionStorage.getItem('expire'), 'DD/MM/YYYY HH:mm:ss');

    if (currentDate.isBefore(expirationDate)) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }
}
