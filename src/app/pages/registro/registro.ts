import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  registroForm: FormGroup;
  errorMessage: string = '';

  constructor() {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registroForm.valid) {
      try {
        await this.authService.register(this.registroForm.value);
        this.router.navigate(['/home']);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'El correo electrónico ya está registrado.';
        } else {
          this.errorMessage = 'Ocurrió un error al registrar el usuario.';
        }
        console.error(error);
      }
    }
  }
}