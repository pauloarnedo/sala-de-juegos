import { Component } from '@angular/core';

@Component({
  selector: 'app-game-list',
  standalone: false,
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss']
})
export class GameList {
  juegos = [
    {
      nombre: 'Ahorcado',
      ruta: '/games/ahorcado',
      imagen: 'assets/images/games/ahorcado.png'
    },
    {
      nombre: 'Mayor o Menor',
      ruta: '/games/mayor-menor',
      imagen: 'assets/images/games/mayor-menor.png'
    },
    {
      nombre: 'Preguntados',
      ruta: '/games/preguntados',
      imagen: 'assets/images/games/preguntados.png'
    },
    {
      nombre: 'Simón Dice',
      ruta: '/games/simon-dice',
      imagen: 'assets/images/games/simon-dice.png'
    }
  ];
}