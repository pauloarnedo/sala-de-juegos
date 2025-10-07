import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ahorcado } from './ahorcado/ahorcado';
import { MayorMenor } from './mayor-menor/mayor-menor';
import { Preguntados } from './preguntados/preguntados';
import { SimonDice } from './simon-dice/simon-dice';
import { GameList } from './game-list/game-list';

const routes: Routes = [
  { path: '', component: GameList },
  { path: 'ahorcado', component: Ahorcado },
  { path: 'mayor-menor', component: MayorMenor },
  { path: 'preguntados', component: Preguntados },
  { path: 'simon-dice', component: SimonDice }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }