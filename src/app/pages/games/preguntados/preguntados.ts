import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService, Pokemon } from '../../../services/pokemon';

@Component({
  selector: 'app-preguntados',
  standalone: false,
  templateUrl: './preguntados.html',
  styleUrls: ['./preguntados.scss']
})
export class Preguntados {
  private pokemonService = inject(PokemonService);

  pokemonPregunta?: Pokemon;
  opciones: string[] = [];
  mensaje = '';
  puntaje = 0;
  vidas = 3; // <-- NUEVA VARIABLE
  juegoTerminado = false; // <-- NUEVA VARIABLE
  juegoIniciado = false;

  iniciarJuego() {
    this.juegoIniciado = true;
    this.juegoTerminado = false; // <-- REINICIAMOS ESTADO
    this.puntaje = 0;
    this.vidas = 3; // <-- REINICIAMOS VIDAS
    this.cargarNuevaPregunta();
  }

  cargarNuevaPregunta() {
    this.pokemonPregunta = undefined;
    this.mensaje = '';
    this.pokemonService.getPreguntaPokemon().subscribe(data => {
      this.pokemonPregunta = data.pregunta;
      this.opciones = data.opciones;
    });
  }

  seleccionarRespuesta(opcionSeleccionada: string) {
    if (this.mensaje) return;

    if (opcionSeleccionada === this.pokemonPregunta?.name) {
      this.puntaje++;
      this.mensaje = '¡Correcto!';
      this.esperarYContinuar(); // <-- LLAMAMOS A UNA NUEVA FUNCIÓN
    } else {
      this.vidas--; // <-- RESTAMOS UNA VIDA
      this.mensaje = `¡Incorrecto! La respuesta era: ${this.pokemonPregunta?.name}`;
      if (this.vidas <= 0) {
        this.terminarJuego(); // <-- SI NO HAY VIDAS, TERMINA EL JUEGO
      } else {
        this.esperarYContinuar(); // <-- SI QUEDAN VIDAS, CONTINÚA
      }
    }
  }

  // Nueva función para manejar la pausa entre preguntas
  private esperarYContinuar() {
    setTimeout(() => {
      this.cargarNuevaPregunta();
    }, 2000);
  }

  // Nueva función para el fin del juego
  private terminarJuego() {
    this.juegoTerminado = true;
    this.mensaje = `¡Juego Terminado! Tu puntaje final es: ${this.puntaje}`;
  }
}