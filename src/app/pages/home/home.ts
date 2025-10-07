import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ResultadosService, ResultadoJuego } from '../../services/resultados';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  private resultadosService = inject(ResultadosService);

  misMejoresResultados: ResultadoJuego[] = [];

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.resultadosService.obtenerResultadosUsuarioActual().then(resultados => {
          this.filtrarMejoresPuntajes(resultados);
        });
      }
    });
  }

  private filtrarMejoresPuntajes(resultados: ResultadoJuego[]) {
    const mejoresPuntajesMap = new Map<string, ResultadoJuego>();

    for (const resultado of resultados) {
      const mejorResultadoExistente = mejoresPuntajesMap.get(resultado.juego);

      if (!mejorResultadoExistente || resultado.puntaje > mejorResultadoExistente.puntaje) {
        mejoresPuntajesMap.set(resultado.juego, resultado);
      }
    }

    this.misMejoresResultados = Array.from(mejoresPuntajesMap.values());
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }
}