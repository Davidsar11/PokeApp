import { map, Observable } from 'rxjs';
import { PokeApi } from '../interfaces/PokeApi.interface';
import { PokeList, Result } from '../interfaces/PokeList.interface';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonSpecie } from '../interfaces/pokemonSpecie';

export class PokemonMapper {

  // Para TODO
  private static mapPokemon(item: PokeApi): Pokemon {

    let habilidades: string[] = [];
    item.abilities.forEach((ability) => habilidades.push(ability.ability.name));

    let tipos: string[] = [];
    item.types.forEach((type) => {
      tipos.push(type.type.name);
    });

    return {
      id: item.id,
      isLegendary: false,
      name: item.name,
      abilities: habilidades,
      height: item.height,
      types: tipos,
      weight: item.weight,
      artWork: item.sprites.other?.['official-artwork'].front_default ?? item.sprites.front_default,
      shiny: item.sprites.other?.['official-artwork'].front_shiny ?? item.sprites.front_shiny,
      HP: item.stats[0].base_stat,
      Attack: item.stats[1].base_stat,
      Defense: item.stats[2].base_stat,
      SpecialAttack: item.stats[3].base_stat,
      SpecialDefense: item.stats[4].base_stat,
      Speed: item.stats[5].base_stat,

    };
  }

  static mapPokemons(items: PokeApi[]): Pokemon[] {
    return items.map(this.mapPokemon);
  }



  // para lista de pokemon species

  private static  mapResults(item: Result) {
    return item.name;
  }

  static mapPokeList(items: PokeList): string[] {
    return items.results.map(this.mapResults);
  }



  
}
