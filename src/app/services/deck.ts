import { Injectable } from '@angular/core';

export interface Carta {
  palo: string;
  valor: string;
  rango: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private palos = ['♥', '♦', '♣', '♠'];
  private valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  crearMazo(): Carta[] {
    const mazo: Carta[] = [];
    for (const palo of this.palos) {
      for (let i = 0; i < this.valores.length; i++) {
        mazo.push({
          palo: palo,
          valor: this.valores[i],
          rango: i + 1
        });
      }
    }
    return mazo;
  }

  barajarMazo(mazo: Carta[]): Carta[] {
    for (let i = mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    return mazo;
  }

  obtenerNuevoMazoBarajado(): Carta[] {
    return this.barajarMazo(this.crearMazo());
  }
}