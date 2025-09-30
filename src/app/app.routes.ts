import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { QuienSoy } from './pages/quien-soy/quien-soy';
import { Registro } from './pages/registro/registro';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'quien-soy', component: QuienSoy },
    { path: 'registro', component: Registro },
    { path: '**', redirectTo: '/home' }
];