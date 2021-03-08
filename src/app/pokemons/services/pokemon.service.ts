import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Pokemon} from '../models/pokemon.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {PagedData} from '../models/paged-data.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonsUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }


  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.httpClient.get<PagedData<Pokemon>>(this.pokemonsUrl).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );
  }

  getPokemonsQuery(offset: number, limit: number): Observable<PagedData<Pokemon>> {
    return this.httpClient.get<PagedData<Pokemon>>(this.pokemonsUrl + '?offset=' + offset + '&limit=' + limit).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(this.pokemonsUrl + '/' + id ).pipe(
      catchError(this.handleError<Pokemon>('getPokemons'))
    );
  }

  searchPokemons(term: string, limit: number = 20): Observable<PagedData<Pokemon>> {
    if (!term.trim()) {
      return of(null);
    }

    return this.httpClient.get<PagedData<Pokemon>>(this.pokemonsUrl + '?search=' + term + '&limit=' + limit ).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('searchPokemons'))
    );
  }


  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
