import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GamesRoutingModule } from './games-routing.module';

import { Ahorcado } from './ahorcado/ahorcado';
import { MayorMenor } from './mayor-menor/mayor-menor';
import { Preguntados } from './preguntados/preguntados';
import { SimonDice } from './simon-dice/simon-dice';
import { GameList } from './game-list/game-list';

@NgModule({
  declarations: [
    Ahorcado,
    MayorMenor,
    Preguntados,
    SimonDice,
    GameList 
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ReactiveFormsModule
  ]
})
export class GamesModule { }