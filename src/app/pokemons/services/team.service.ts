import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private trainerUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/trainers';

  constructor(private http: HttpClient) {
  }

  getTeam(token: string): Observable<number[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<number[]>(this.trainerUrl + '/me/team', {headers});
  }

  setTeam(): void {

  }
}
