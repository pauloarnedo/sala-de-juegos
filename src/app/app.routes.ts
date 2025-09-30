import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { QuienSoy } from './pages/quien-soy/quien-soy';
import { Registro } from './pages/registro/registro';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'quien-soy', component: QuienSoy },
  { path: 'registro', component: Registro },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/chat/chat').then(m => m.Chat)
  },
  {
    path: 'games/ahorcado',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/games/ahorcado/ahorcado').then(m => m.Ahorcado)
  },
  {
    path: 'games/mayor-menor',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/games/mayor-menor/mayor-menor').then(m => m.MayorMenor)
  },
  { path: '**', redirectTo: '/home' }
];