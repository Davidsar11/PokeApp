import { TitleCasePipe } from '@angular/common';
import { Component, effect, input, linkedSignal, output } from '@angular/core';


@Component({
  selector: 'app-search-input',
  imports: [TitleCasePipe],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  botones: string[] = ['all','ground', 'water', 'fire', 'flying',  'Legendary','Shiny'];

  colores: string[] = ['btn-primary', 'btn-warning' , 'btn-info', 'btn-danger', 'btn-secondary', 'btn-success',  'btn-dark']
  coloresOut: string[] = ['btn-outline-primary', 'btn-outline-warning' , 'btn-outline-info', 'btn-outline-danger', 'btn-outline-secondary', 'btn-outline-success',  'btn-outline-dark']

  placeholder = input<string>();




  inputQuery = input<string>();
  emitir = output<string>();

  inputShiny = input.required<boolean>();
  isShiny = output<boolean>();

  inputLegendary = input.required<boolean>();
  isLegendary = output<boolean>();
}
