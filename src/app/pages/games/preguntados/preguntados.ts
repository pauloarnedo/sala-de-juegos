import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService, Pokemon } from '../../../services/pokemon';
import { ResultadosService } from '../../../services/resultados';

@Component({
  selector: 'app-preguntados',
  standalone: false,
  templateUrl: './preguntados.html',
  styleUrls: ['./preguntados.scss']
})
export class Preguntados {
  private pokemonService = inject(PokemonService);
  private resultadosService = inject(ResultadosService);

  pokemonPregunta?: Pokemon;
  opciones: string[] = [];
  mensaje = '';
  puntaje = 0;
  vidas = 3; 
  juegoTerminado = false;
  juegoIniciado = false;

  iniciarJuego() {
    this.juegoIniciado = true;
    this.juegoTerminado = false;
    this.puntaje = 0;
    this.vidas = 3;
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
      this.esperarYContinuar();
    } else {
      this.vidas--;
      this.mensaje = `¡Incorrecto! La respuesta era: ${this.pokemonPregunta?.name}`;
      if (this.vidas <= 0) {
        this.terminarJuego();
      } else {
        this.esperarYContinuar();
      }
    }
  }

  private esperarYContinuar() {
    setTimeout(() => {
      this.cargarNuevaPregunta();
    }, 2000);
  }

  private terminarJuego() {
    this.juegoTerminado = true;
    this.mensaje = `¡Juego Terminado! Tu puntaje final es: ${this.puntaje}`;
    this.resultadosService.agregarResultado('Preguntados', this.puntaje);
  }
}