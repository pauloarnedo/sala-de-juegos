import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { Ahorcado } from './ahorcado/ahorcado';
import { MayorMenor } from './mayor-menor/mayor-menor';


@NgModule({
  declarations: [
    Ahorcado,
    MayorMenor
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }