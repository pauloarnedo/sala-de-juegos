import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from '@angular/fire/firestore';
import { AuthService } from './auth';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth'; // Asegúrate de importar User

export interface Message {
  user: string;
  text: string;
  createdAt: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private firestore: Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService);
  private currentUser: User | null = null;

  constructor() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // Obtener mensajes en tiempo real
  getMessages(): Observable<Message[]> {
    const messagesCollection = collection(this.firestore, 'chatMessages');
    const q = query(messagesCollection, orderBy('createdAt', 'asc'));

    return new Observable(observer => {
      const unsubscribe = onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => doc.data() as Message);
        observer.next(messages);
      });
      // Se llama cuando el observable es cancelado
      return () => unsubscribe();
    });
  }

  // Enviar un mensaje
  async sendMessage(text: string) {
    if (!this.currentUser) {
      console.error('User not logged in!');
      return;
    }

    const messagesCollection = collection(this.firestore, 'chatMessages');
    await addDoc(messagesCollection, {
      user: this.currentUser.email,
      text: text,
      createdAt: serverTimestamp()
    });
  }
}