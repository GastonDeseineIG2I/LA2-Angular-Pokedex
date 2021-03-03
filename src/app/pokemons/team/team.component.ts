import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'pkm-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit{

  pokemonTeam = [];

  constructor() {
  }

  ngOnInit(): void {
      // On recupere l'equipe et on met a jour 'pokemons'
    this.getTeam();
  }

  getTeam(): void {
    this.pokemonTeam = [];
  }

}
