import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pokemon} from '../models/pokemon.model';
import {PokemonService} from '../services/pokemon.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'pkm-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges {

  pokemon: Pokemon;
  @Input() pokemonId;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private location: Location) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id = this.pokemonId; /*+this.route.snapshot.paramMap.get('id');*/
    this.pokemonService.getPokemon(id).subscribe( pokemon => this.pokemon = pokemon);
  }
}
