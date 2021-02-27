import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pkm-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {


  @Output() searchTerm = new EventEmitter<string>();


  constructor() { }

  emitInput(search: string): void {
    this.searchTerm.emit(search);
  }

  ngOnInit(): void {
  }


}
