import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ahorcado } from './ahorcado/ahorcado';
import { MayorMenor } from './mayor-menor/mayor-menor';

const routes: Routes = [
  { path: 'ahorcado', component: Ahorcado },
  { path: 'mayor-menor', component: MayorMenor },
  { path: '', redirectTo: 'ahorcado', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }