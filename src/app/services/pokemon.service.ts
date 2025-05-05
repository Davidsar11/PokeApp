import { Pokemon } from '../interfaces/pokemon.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PokeApi } from '../interfaces/PokeApi.interface';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { PokemonMapper } from '../mapper/pokemon.mapper';
import { PokeList } from '../interfaces/PokeList.interface';
import { PokemonSpecie } from '../interfaces/pokemonSpecie';

const URL = 'https://pokeapi.co/api/v2';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private queryCache = new Map<string, Pokemon[]>();
  private ultimaQuery = signal<string>('');
  private legendarios = signal<PokemonSpecie[]>([]);
  active = signal<string>('');
  private todosPokemon = signal<Pokemon[]>([]);

  pokemonByName(query: string): Observable<Pokemon[]> {
    return of(
      this.queryCache
        .get(this.active())!
        .filter((pokemon) => pokemon.name.includes(query))
    );
  }

  pokemonByType(type: string): Observable<Pokemon[]> {
    const aux = this.todosPokemon().filter((pok) => pok.types.includes(type));
    this.ultimaQuery.set(type);
    this.queryCache.set(type, aux);
    return of(aux);
  }


  private searchAuxLegendary(pok: Pokemon[]) {

    return this.http.get<PokeList>(`${URL}/pokemon-species?limit=10000`).pipe(
      // obtiene lista de especies
      map((item) => PokemonMapper.mapPokeList(item)), //PokeList --> string()
      switchMap((response) => {
        const datailRequests: Observable<PokemonSpecie>[] = response.map(
          (poke) =>
            this.http.get<PokemonSpecie>(`${URL}/pokemon-species/${poke}`)
        );
        return forkJoin(datailRequests); // cuando todas han terminado las devuelve
      }), // filtra los legendarios
      map((items) => items.filter((pokemon) => pokemon.is_legendary)),
      tap((items) => this.legendarios.set(items)),
      map(() => {
        pok.forEach((pokemon) => {
          if (this.legendarios().find((p) => pokemon.name.includes(p.name))) {
            pokemon.isLegendary = true;
          }
        });
        return pok;
      }),
      catchError((error) => {
        console.error('Error feching', error);
        return throwError(
          () => new Error('No se pudo obtener pokemon con ese input')
        );
      })
    );
  }

  private searchAux(response: string[]): Observable<PokeApi[]> {
    const datailRequests: Observable<PokeApi>[] = response.map((poke) =>
      this.http.get<PokeApi>(`${URL}/pokemon/${poke}`));

    return forkJoin(datailRequests);
  }

  pokemonAll() {
    return this.http.get<PokeList>(`${URL}/pokemon?limit=10000`).pipe(
      map((item) => PokemonMapper.mapPokeList(item)), // PokeList --> string(nomnbre)
      switchMap((response) => {
        return this.searchAux(response);
      }),
      map((items) => PokemonMapper.mapPokemons(items)), // PokeApi --> Pokemon
      tap(() => this.ultimaQuery.set('all')),
      tap( (irtems) => this.queryCache.set('all',irtems )),
      tap((pokemons) => this.todosPokemon.set(pokemons)),
      catchError((error) => {
        console.error('Error feching', error);
        return throwError(
          () => new Error('No se pudo obtener pokemon con ese input')
        );
      })
    );
  }

  pokemonByQuery(query: string, isLegendary : boolean): Observable<Pokemon[]> {

    if(isLegendary && this.legendarios().length < 1 ){
        this.active.set('all');
        return this.searchAuxLegendary(this.todosPokemon());
    }



    if (query == '') {
      return of(this.queryCache.get(this.active()) ?? []);
    }




    query = query.toLowerCase();

    switch (query) {
      case 'fire':
      case 'flying':
      case 'ground':
      case 'water':
        if (this.queryCache.has(query)) {
          this.active.set(query);
          this.ultimaQuery.set(query);
          return of(this.queryCache.get(query) ?? []);
        }
        this.active.set(query);
        return this.pokemonByType(query);

      case 'all':
        if (this.queryCache.has(query) ) {
          this.ultimaQuery.set(query);
          this.active.set(query);
          return of(this.queryCache.get(query) ?? []);
        }
        this.active.set(query);
        return this.pokemonAll();

      default:
        return this.pokemonByName(query);
    }
  }
}
