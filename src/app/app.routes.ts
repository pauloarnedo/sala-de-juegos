import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { QuienSoy } from './pages/quien-soy/quien-soy';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'quien-soy', component: QuienSoy },
    { path: '**', redirectTo: '/home' } // Redirige cualquier otra ruta a /home
];