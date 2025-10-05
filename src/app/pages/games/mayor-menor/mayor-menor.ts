import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckService, Carta } from '../../../services/deck';

@Component({
  selector: 'app-mayor-menor',
  standalone: false,
  templateUrl: './mayor-menor.html',
  styleUrl: './mayor-menor.scss'
})
export class MayorMenor {
  private deckService = inject(DeckService);

  mazo: Carta[] = [];
  cartaActual!: Carta;
  siguienteCarta!: Carta;
  puntaje = 0;
  juegoTerminado = false;
  mensaje = '';

  constructor() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.mazo = this.deckService.obtenerNuevoMazoBarajado();
    this.puntaje = 0;
    this.juegoTerminado = false;
    this.mensaje = 'Adivina si la próxima carta será mayor o menor.';
    this.sacarPrimeraCarta();
  }

  private sacarPrimeraCarta() {
    this.cartaActual = this.mazo.pop()!;
  }

  hacerSuposicion(suposicion: 'mayor' | 'menor') {
    if (this.juegoTerminado || this.mazo.length === 0) {
      this.terminarJuego();
      return;
    }

    this.siguienteCarta = this.mazo.pop()!;
    const esCorrecto = (suposicion === 'mayor' && this.siguienteCarta.rango > this.cartaActual.rango) ||
                       (suposicion === 'menor' && this.siguienteCarta.rango < this.cartaActual.rango);

    if (this.siguienteCarta.rango === this.cartaActual.rango) {
      this.mensaje = `¡Empate! La carta era ${this.siguienteCarta.valor}${this.siguienteCarta.palo}. ¡No sumas puntos!`;
    } else if (esCorrecto) {
      this.puntaje++;
      this.mensaje = `¡Correcto! La carta era ${this.siguienteCarta.valor}${this.siguienteCarta.palo}.`;
    } else {
      this.mensaje = `¡Incorrecto! La carta era ${this.siguienteCarta.valor}${this.siguienteCarta.palo}. Fin del juego.`;
      this.terminarJuego();
    }

    this.cartaActual = this.siguienteCarta;

    if (this.mazo.length === 0 && !this.juegoTerminado) {
      this.mensaje = `¡Felicidades! ¡Completaste el mazo! Puntaje final: ${this.puntaje}`;
      this.terminarJuego();
    }
  }

  private terminarJuego() {
    this.juegoTerminado = true;
  }
}