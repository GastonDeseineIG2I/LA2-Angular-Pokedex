import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonDetailComponent} from './pokemons/pokemon-detail/pokemon-detail.component';
import {PokemonListComponent} from './pokemons/pokemon-list/pokemon-list.component';
import {PokedexComponent} from './pokemons/pokedex/pokedex.component';
import {LoginComponent} from './pokemons/login/login.component';
import {AuthGuard} from './pokemons/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
  { path: 'pokedex', component: PokedexComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  /*{ path: 'pokemons', component: PokemonListComponent },
  { path: 'detail/:id', component: PokemonDetailComponent }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
