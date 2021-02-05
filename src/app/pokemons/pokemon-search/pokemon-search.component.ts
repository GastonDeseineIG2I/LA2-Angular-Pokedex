import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PagedData} from '../models/paged-data.model';
import {Pokemon} from '../models/pokemon.model';
import {Observable, Subject} from 'rxjs';
import {PokemonService} from '../services/pokemon.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'pkm-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {

  pokemonsData: Observable<PagedData<Pokemon>>;

  private searchTerms = new Subject<string>();


  @Output() pokemonId  = new EventEmitter<number>();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonsData = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap( (term: string) => this.pokemonService.searchPokemons(term))
    );
  }

  search(term: string): void{
    this.searchTerms.next(term);
  }

  updateId(id: number): void{
    this.pokemonId.emit(id);
  }

}
