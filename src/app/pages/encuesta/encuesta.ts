import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { EncuestaService } from '../../services/encuesta';

function alMenosUnCheckboxSeleccionado(): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const algunoSeleccionado = Object.keys(group.controls).some(key => group.get(key)?.value);
    return algunoSeleccionado ? null : { alMenosUnoRequerido: true };
  };
}

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.html',
  styleUrls: ['./encuesta.scss']
})
export class Encuesta {
  private fb = inject(FormBuilder);
  private encuestaService = inject(EncuestaService);

  encuestaForm: FormGroup;
  mensajeEnviado = '';
  juegosFavoritos = ['Ahorcado', 'Mayor o Menor', 'Preguntados', 'Simón Dice'];

  constructor() {
    this.encuestaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(10)]],
      juegoFavorito: ['', Validators.required],
      opinionJuegos: ['', [Validators.required, Validators.maxLength(300)]],
      mejoraria: this.fb.group({
        graficos: [false],
        rendimiento: [false],
        masJuegos: [false]
      }, { validators: alMenosUnCheckboxSeleccionado() })
    });
  }

  async enviarEncuesta() {
    if (this.encuestaForm.invalid) {
      this.encuestaForm.markAllAsTouched();
      return;
    }

    try {
      await this.encuestaService.guardarEncuesta(this.encuestaForm.value);
      this.mensajeEnviado = '¡Muchas gracias por completar la encuesta!';
      this.encuestaForm.disable();
    } catch (error) {
      this.mensajeEnviado = 'Ocurrió un error al enviar tu respuesta. Inténtalo de nuevo.';
      console.error(error);
    }
  }

  get form() { return this.encuestaForm.controls; }
  get formMejoraria() { return (this.encuestaForm.get('mejoraria') as FormGroup).controls; }
}