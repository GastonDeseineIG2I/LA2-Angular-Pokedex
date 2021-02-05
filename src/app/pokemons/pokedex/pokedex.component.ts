import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pkm-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemonId = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate($event: number): void {
    console.log($event);
    this.pokemonId = $event;
  }
}
