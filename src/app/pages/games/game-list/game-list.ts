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
      imagen: 'assets/images/ahorcado.png'
    },
    {
      nombre: 'Mayor o Menor',
      ruta: '/games/mayor-menor',
      imagen: 'assets/images/mayor-menor.png'
    },
    {
      nombre: 'Preguntados',
      ruta: '/games/preguntados',
      imagen: 'assets/images/preguntados.png'
    },
    {
      nombre: 'Simón Dice',
      ruta: '/games/simon-dice',
      imagen: 'assets/images/simon-dice.png'
    }
  ];
}