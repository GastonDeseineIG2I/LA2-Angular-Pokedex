import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PokemonService} from '../services/pokemon.service';
import {Pokemon} from '../models/pokemon.model';
import {PagedData} from '../models/paged-data.model';

@Component({
  selector: 'pkm-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemonsData: PagedData<Pokemon> = null;
  @Output() pokemonId  = new EventEmitter<number>();

  constructor( private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(offset: number = 0, limit: number = 20): void {
    this.pokemonService.getPokemonsQuery(offset, limit).subscribe((pokemonsData: PagedData<Pokemon>) => this.pokemonsData = pokemonsData);
  }

  onScroll(): void{
    this.pokemonsData.offset += this.pokemonsData.limit;
    this.pokemonService.getPokemonsQuery(this.pokemonsData.offset, this.pokemonsData.limit)
      .subscribe((pokemonsData: PagedData<Pokemon>) => this.pokemonsData.data = this.pokemonsData.data.concat(pokemonsData.data));

  }

  updateId(id: number): void{
    this.pokemonId.emit(id);
  }
}
