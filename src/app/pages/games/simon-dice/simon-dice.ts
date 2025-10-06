import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simon-dice',
  standalone: false,
  templateUrl: './simon-dice.html',
  styleUrls: ['./simon-dice.scss']
})
export class SimonDice {
  colores = ['verde', 'rojo', 'amarillo', 'azul'];
  secuencia: string[] = [];
  secuenciaJugador: string[] = [];
  nivel = 0;
  mensaje = 'Presiona "Comenzar" para jugar';
  juegoActivo = false;
  juegoTerminado = true; // <-- NUEVA VARIABLE, empieza en true para mostrar el botón "Comenzar"
  colorActivo = '';

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  iniciarJuego() {
    this.secuencia = [];
    this.nivel = 0;
    this.juegoTerminado = false; // <-- El juego ya no está "terminado"
    this.siguienteNivel();
  }

  private async siguienteNivel() {
    this.secuenciaJugador = [];
    this.nivel++;
    this.mensaje = `Nivel ${this.nivel}`;
    
    const nuevoColor = this.colores[Math.floor(Math.random() * this.colores.length)];
    this.secuencia.push(nuevoColor);

    await this.mostrarSecuencia();
  }

  private async mostrarSecuencia() {
    this.juegoActivo = false;
    await this.delay(1000);

    for (const color of this.secuencia) {
      this.colorActivo = color;
      await this.delay(500);
      this.colorActivo = '';
      await this.delay(200);
    }

    this.mensaje = 'Tu turno...';
    this.juegoActivo = true;
  }

  manejarClic(color: string) {
    if (!this.juegoActivo) return;

    this.secuenciaJugador.push(color);
    const indiceActual = this.secuenciaJugador.length - 1;

    if (this.secuenciaJugador[indiceActual] !== this.secuencia[indiceActual]) {
      this.terminarJuego('¡Incorrecto! Perdiste.');
      return;
    }

    if (this.secuenciaJugador.length === this.secuencia.length) {
      this.mensaje = '¡Bien hecho!';
      this.siguienteNivel();
    }
  }

  private terminarJuego(mensajeFinal: string) {
    this.mensaje = `${mensajeFinal} Llegaste al nivel ${this.nivel}.`;
    this.juegoActivo = false;
    this.juegoTerminado = true; // <-- Marcamos el juego como "terminado"
  }
}