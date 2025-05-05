import { Component, computed, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {



  query = signal<string>('all');

  pokemonServie = inject(PokemonService);

  ultimaQuery = linkedSignal<string>(this.pokemonServie.active);

  isShiny = signal(false);

  isLegendary= signal(false);


  pokemonResource = rxResource({
    request : () => ({query: this.query() , legendary: this.isLegendary()} ),
    loader: ({request}) => {

      return this.pokemonServie.pokemonByQuery(request.query, request.legendary);
    }
  });



}
