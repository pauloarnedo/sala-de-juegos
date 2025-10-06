import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private totalPokemons = 898; 

  private getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}${id}`);
  }

  getPreguntaPokemon(): Observable<{ pregunta: Pokemon, opciones: string[] }> {
    const ids = new Set<number>();
    while (ids.size < 4) {
      ids.add(Math.floor(Math.random() * this.totalPokemons) + 1);
    }
    const randomIds = Array.from(ids);

    const requests: Observable<Pokemon>[] = randomIds.map(id => this.getPokemonById(id));

    return forkJoin(requests).pipe(
      map(pokemons => {
        const pregunta = pokemons[0];
        const opciones = this.barajarOpciones(pokemons.map(p => p.name));

        return { pregunta, opciones };
      })
    );
  }

  private barajarOpciones(opciones: string[]): string[] {
    for (let i = opciones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
    }
    return opciones;
  }
}