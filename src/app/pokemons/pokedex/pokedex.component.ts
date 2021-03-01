import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PagedData} from '../models/paged-data.model';
import {Pokemon} from '../models/pokemon.model';

@Component({
  selector: 'pkm-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonId = 1;

  searchTerm;

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate($event: number): void {
    this.pokemonId = $event;
  }

  onSearch($event: string): void {
    this.searchTerm = $event;
  }
}
