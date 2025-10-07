import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, orderBy, limit, Timestamp } from '@angular/fire/firestore';
import { AuthService } from './auth';
import { firstValueFrom } from 'rxjs';

export interface ResultadoJuego {
  id?: string;
  emailUsuario: string;
  juego: string;
  puntaje: number;
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
  private firestore: Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService);
  private resultadosCollection = collection(this.firestore, 'resultadosJuegos');

  async agregarResultado(juego: string, puntaje: number) {
    const usuario = await firstValueFrom(this.authService.user$);
    if (!usuario || !usuario.email) {
      console.error('No hay un usuario logueado para guardar el resultado.');
      return;
    }

    const resultado: ResultadoJuego = {
      emailUsuario: usuario.email,
      juego: juego,
      puntaje: puntaje,
      fecha: new Date()
    };

    return addDoc(this.resultadosCollection, resultado);
  }

  async obtenerResultadosUsuarioActual() {
    const usuario = await firstValueFrom(this.authService.user$);
    if (!usuario || !usuario.email) return [];

    const q = query(
      this.resultadosCollection,
      where('emailUsuario', '==', usuario.email),
      orderBy('fecha', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const fechaTimestamp = data['fecha'] as Timestamp;
      return {
        id: doc.id,
        emailUsuario: data['emailUsuario'],
        juego: data['juego'],
        puntaje: data['puntaje'],
        fecha: fechaTimestamp.toDate() 
      } as ResultadoJuego;
    });
  }

  async obtenerMejoresPuntajes(juego: string) {
    const q = query(
      this.resultadosCollection,
      where('juego', '==', juego),
      orderBy('puntaje', 'desc'),
      limit(3)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ResultadoJuego));
  }
}