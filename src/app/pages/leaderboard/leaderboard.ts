import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosService, ResultadoJuego } from '../../services/resultados';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.scss']
})
export class Leaderboard implements OnInit {
  private resultadosService = inject(ResultadosService);

  mejoresAhorcado: ResultadoJuego[] = [];
  mejoresMayorMenor: ResultadoJuego[] = [];
  mejoresPreguntados: ResultadoJuego[] = [];
  mejoresSimonDice: ResultadoJuego[] = [];

  isLoading = true;

  async ngOnInit() {
    try {
      const [ahorcado, mayorMenor, preguntados, simonDice] = await Promise.all([
        this.resultadosService.obtenerMejoresPuntajes('Ahorcado'),
        this.resultadosService.obtenerMejoresPuntajes('Mayor o Menor'),
        this.resultadosService.obtenerMejoresPuntajes('Preguntados'),
        this.resultadosService.obtenerMejoresPuntajes('Simón Dice')
      ]);
      this.mejoresAhorcado = ahorcado;
      this.mejoresMayorMenor = mayorMenor;
      this.mejoresPreguntados = preguntados;
      this.mejoresSimonDice = simonDice;
    } catch (error) {
      console.error("Error al cargar los leaderboards:", error);
    } finally {
      this.isLoading = false;
    }
  }
}