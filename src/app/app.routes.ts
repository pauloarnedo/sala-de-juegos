import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { QuienSoy } from './pages/quien-soy/quien-soy';
import { Registro } from './pages/registro/registro';
import { authGuard } from './guards/auth-guard';
import { Encuesta } from './pages/encuesta/encuesta';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'quien-soy', component: QuienSoy },
  { path: 'registro', component: Registro },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/chat/chat').then(m => m.Chat)
  },
  {
    path: 'games',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/games/games-module').then(m => m.GamesModule)
  },
  {
    path: 'leaderboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/leaderboard/leaderboard').then(m => m.Leaderboard)
  },
  {
    path: 'encuesta',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/encuesta/encuesta').then(m => m.Encuesta)
  },
  { path: '**', redirectTo: '/home' }
];