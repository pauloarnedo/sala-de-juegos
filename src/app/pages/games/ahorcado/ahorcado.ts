import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosService } from '../../../services/resultados';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.scss'
})
export class Ahorcado {
  private resultadosService = inject(ResultadosService);
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

  // --- NUEVAS VARIABLES ---
  puntaje = 0;
  puedeFinalizar = false; // Controla la visibilidad del botón "Finalizar Partida"

  constructor() {
    this.iniciarPartida();
  }

  // Inicia una sesión de juego completa, reseteando el puntaje
  iniciarPartida() {
    this.puntaje = 0;
    this.iniciarNuevaPalabra();
  }

  // Prepara una nueva palabra, pero mantiene el puntaje actual
  private iniciarNuevaPalabra() {
    this.palabraAAdivinar = this.listaDePalabras[Math.floor(Math.random() * this.listaDePalabras.length)];
    this.palabraMostrada = '_ '.repeat(this.palabraAAdivinar.length);
    this.letrasAdivinadas.clear();
    this.errores = 0;
    this.juegoTerminado = false;
    this.mensajeDeEstado = '';
    this.puedeFinalizar = true; // <-- Permite finalizar la partida al inicio de una palabra
  }

  adivinarLetra(letra: string) {
    if (this.juegoTerminado || this.letrasAdivinadas.has(letra)) {
      return;
    }
    
    this.puedeFinalizar = false; // <-- Oculta el botón después del primer intento
    this.letrasAdivinadas.add(letra);

    if (this.palabraAAdivinar.includes(letra)) {
      this.actualizarPalabraMostrada();
      this.verificarVictoria();
    } else {
      this.errores++;
      this.verificarDerrota();
    }
  }

  // Nueva función para el botón "Finalizar Partida"
  finalizarPartida() {
    this.juegoTerminado = true;
    this.mensajeDeEstado = `¡Partida finalizada! Tu puntaje final es: ${this.puntaje}`;
    this.resultadosService.agregarResultado('Ahorcado', this.puntaje);
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
      // En lugar de terminar el juego, suma puntos y pasa a la siguiente palabra
      this.puntaje += 1; // 1 punto por palabra adivinada
      this.mensajeDeEstado = '¡Palabra correcta! Cargando siguiente...';
      setTimeout(() => this.iniciarNuevaPalabra(), 2000); // Espera 2 seg y carga otra palabra
    }
  }

  private verificarDerrota() {
    if (this.errores >= this.maximoErrores) {
      this.juegoTerminado = true;
      this.mensajeDeEstado = `¡Has perdido! La palabra era: ${this.palabraAAdivinar}`;
      this.resultadosService.agregarResultado('Ahorcado', this.puntaje);
    }
  }
}