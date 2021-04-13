import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {PokemonService} from '../services/pokemon.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {PagedData} from '../models/paged-data.model';
import {Pokemon} from '../models/pokemon.model';

@Component({
  selector: 'pkm-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit{

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  pokemonCtrl = new FormControl();
  filteredPokemons: Observable<string[]>;
  pokemonIds: string[] = ['25', '101', '75', '94', '4', '8'];
  pokemonTeam = [];
  allPokemons: any[] = [];

  @ViewChild('pokemonInput') pokemonInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(private pokemonService: PokemonService) {
    this.filteredPokemons = this.pokemonCtrl.valueChanges.pipe(
      startWith(null),
      map((pokemon: string | null) => pokemon ? this._filter(pokemon) : this.allPokemons.slice()));
  }

  ngOnInit(): void {
      // On recupere l'equipe et on met a jour 'pokemons'
    this.getTeam();
  }

  getTeam(): void {
    this.pokemonTeam = [];

    const forkArray: Observable<any>[] = this.pokemonIds.map((id) => this.pokemonService.getPokemon( parseInt(id, 0) ));

    forkJoin(forkArray).subscribe(team => {
      this.pokemonTeam = team;
    });
  }

  add(event: MatChipInputEvent): void {

    if (this.pokemonTeam.length >= 6){
      return;
    }

    const input = event.input;
    const value = event.value;

    const pokemonExist = this.pokemonTeam.filter( el => el.id === parseInt(value, 0) );

    if (pokemonExist.length > 0){
      return;
    }

    this.pokemonService.getPokemon( parseInt(value, 0)).subscribe( pokemon => {
      if (pokemon !== undefined){
        this.pokemonTeam.push(pokemon);
      }
    });

    if (input) {
      input.value = '';
    }

    this.pokemonCtrl.setValue(null);
  }

  remove(pokemonId: string): void {

    const pokemon = this.pokemonTeam.filter( el => el.id === pokemonId )[0];
    const index = this.pokemonTeam.indexOf(pokemon);

    if (index >= 0) {
      this.pokemonTeam.splice(index, 1);
    }

  }

  private _filter(value: string): string[] {
    // TODO
    const filterValue = value.toLowerCase();

    return this.allPokemons.filter(pokemon => pokemon.toLowerCase().indexOf(filterValue) === 0);
  }

}
