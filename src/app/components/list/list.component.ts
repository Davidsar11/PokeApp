import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";
import { Pokemon } from '../../interfaces/pokemon.interface';
import { JsonPipe } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'pokemon-list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {


  pokemons = input.required<Pokemon[]>();

  errorMessage = input<string | unknown>();
  isLoading = input<boolean>(false);

  isShiny = input<boolean>(false);

  isEmpty = input<boolean>(true);

  isLegendary = input<boolean>(false);


  obtenerPokemon(){
    if(this.isLegendary()){
      return this.pokemons()
              .filter((pokemon) => pokemon.isLegendary)
          ;
    }

    return this.pokemons();
  }



}
