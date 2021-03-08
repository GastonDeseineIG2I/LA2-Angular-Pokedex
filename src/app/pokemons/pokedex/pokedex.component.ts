import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'pkm-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonId = 1;

  searchTerm;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onUpdate($event: number): void {
    this.pokemonId = $event;
  }

  onSearch($event: string): void {
    this.searchTerm = $event;
  }
}
