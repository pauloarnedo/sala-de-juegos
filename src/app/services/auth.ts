import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  public user$: Observable<User | null> = authState(this.auth);

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  logUserLogin(email: string) {
    const logsCollection = collection(this.firestore, 'userLogs');
    return addDoc(logsCollection, {
      user: email,
      loginDate: new Date()
    });
  }
}