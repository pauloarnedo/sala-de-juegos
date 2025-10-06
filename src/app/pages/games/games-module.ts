import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { Ahorcado } from './ahorcado/ahorcado';
import { MayorMenor } from './mayor-menor/mayor-menor';
import { Preguntados } from './preguntados/preguntados';
import { SimonDice } from './simon-dice/simon-dice';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Ahorcado,
    MayorMenor,
    Preguntados,
    SimonDice
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }