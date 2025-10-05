import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.scss'
})
export class Ahorcado {
  private listaDePalabras = ['ANGULAR', 'COMPONENTE', 'SERVICIO', 'DIRECTIVA', 'PROMESA', 'OBSERVABLE'];
  
  palabraAAdivinar = '';
  palabraMostrada = '';
  filasTeclado = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  letrasAdivinadas = new Set<string>();
  errores = 0;
  maximoErrores = 6;
  juegoTerminado = false;
  mensajeDeEstado = '';

  constructor() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.palabraAAdivinar = this.listaDePalabras[Math.floor(Math.random() * this.listaDePalabras.length)];
    this.palabraMostrada = '_ '.repeat(this.palabraAAdivinar.length);
    this.letrasAdivinadas.clear();
    this.errores = 0;
    this.juegoTerminado = false;
    this.mensajeDeEstado = '';
  }

  adivinarLetra(letra: string) {
    if (this.juegoTerminado || this.letrasAdivinadas.has(letra)) {
      return;
    }

    this.letrasAdivinadas.add(letra);

    if (this.palabraAAdivinar.includes(letra)) {
      this.actualizarPalabraMostrada();
      this.verificarVictoria();
    } else {
      this.errores++;
      this.verificarDerrota();
    }
  }

  private actualizarPalabraMostrada() {
    let nuevaPalabra = '';
    for (const caracter of this.palabraAAdivinar) {
      nuevaPalabra += this.letrasAdivinadas.has(caracter) ? `${caracter} ` : '_ ';
    }
    this.palabraMostrada = nuevaPalabra.trim();
  }

  private verificarVictoria() {
    if (!this.palabraMostrada.includes('_')) {
      this.juegoTerminado = true;
      this.mensajeDeEstado = '¡Felicidades, has ganado!';
    }
  }

  private verificarDerrota() {
    if (this.errores >= this.maximoErrores) {
      this.juegoTerminado = true;
      this.mensajeDeEstado = `¡Has perdido! La palabra era: ${this.palabraAAdivinar}`;
    }
  }
}