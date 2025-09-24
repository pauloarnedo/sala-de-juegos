import { Component } from '@angular/core';
// 1. Importa RouterOutlet y RouterLink aquí
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Añádelos al array de imports
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { // O AppComponent, como se llame tu clase
  title = 'sala-de-juegos';
}