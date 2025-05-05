import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'pokemon-list-item',
  imports: [TitleCasePipe],
  templateUrl: './list-item.component.html',

})
export class ListItemComponent {
  pokemon = input.required<Pokemon>();
  isShiny = input<boolean>(false);


  color = new Map<string,string> ([
    ['fire', 'red'],
    ['normal', '#e2e2e2'],
    ['fighting', 'brown'],
    ['flying', 'skyblue'],
    ['poison', 'darkviolet'],
    ['ground', 'chocolate'],
    ['rock', 'darkgoldenrod'],
    ['bug', 'olivedrab'],
    ['ghost', 'indigo'],
    ['steel', '#6c656c'],
    ['water', 'blue'],
    ['grass', 'green'],
    ['electric', 'yellow'],
    ['ice', 'aqua'],
    ['psychic', 'fuchsia'],
    ['dark', 'black'],
    ['fairy', 'hotpink'],
    ['dragon', '#5e0295'],
    ['stellar', 'red'],
    ['unknown', 'lime'],
  ]);



}
