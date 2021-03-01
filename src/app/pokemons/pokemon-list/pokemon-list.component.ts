import {Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges} from '@angular/core';
import {PokemonService} from '../services/pokemon.service';
import {Pokemon} from '../models/pokemon.model';
import {PagedData} from '../models/paged-data.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'pkm-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnChanges, OnInit {

  pokemonsData: PagedData<Pokemon> = null;
  @Output() pokemonId  = new EventEmitter<number>();

  @Input() searchTerm;


  constructor( private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(offset: number = 0, limit: number = 20, searchTerm = null): void {
    if ( searchTerm != null && searchTerm !== '' ){
      this.pokemonService.searchPokemons(searchTerm, limit)
        .subscribe((pokemonsData: PagedData<Pokemon>) => this.pokemonsData = pokemonsData);
    }else{
      this.pokemonService.getPokemonsQuery(offset, limit)
        .subscribe((pokemonsData: PagedData<Pokemon>) => this.pokemonsData = pokemonsData);
    }
  }

  onScroll(): void{
    this.pokemonsData.offset += this.pokemonsData.limit;
    this.pokemonService.getPokemonsQuery(this.pokemonsData.offset, this.pokemonsData.limit)
      .subscribe((pokemonsData: PagedData<Pokemon>) => this.pokemonsData.data = this.pokemonsData.data.concat(pokemonsData.data));

  }

  ngOnChanges(changes: SimpleChanges): void {
    let limit;
    if (this.pokemonsData == null){
      limit = 20;
    }else{
      limit = 20;
      // TODO Pour lisibilité pendant les tests
      // limit = this.pokemonsData.limit;
    }
    this.getPokemons(0, limit, this.searchTerm );
  }

  updateId(id: number): void{
    this.pokemonId.emit(id);
  }
}
