import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private firestore: Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService);
  private encuestasCollection = collection(this.firestore, 'encuestas');

  async guardarEncuesta(datosEncuesta: any) {
    const usuario = await firstValueFrom(this.authService.user$);
    if (!usuario || !usuario.email) {
      throw new Error('Usuario no logueado.');
    }

    const encuestaCompleta = {
      ...datosEncuesta,
      emailUsuario: usuario.email,
      fecha: new Date()
    };

    return addDoc(this.encuestasCollection, encuestaCompleta);
  }
}