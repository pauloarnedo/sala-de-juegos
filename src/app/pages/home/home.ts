import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  authService = inject(AuthService);
  router = inject(Router);

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }
}