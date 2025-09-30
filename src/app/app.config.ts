import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGzxIjOZU7N_i_6Xh4iTVdHiL1XYjrxTI",
  authDomain: "sala-de-juegos-app.firebaseapp.com",
  projectId: "sala-de-juegos-app",
  storageBucket: "sala-de-juegos-app.firebasestorage.app",
  messagingSenderId: "83311271844",
  appId: "1:83311271844:web:94ed8bc40ce052c9a9ab31"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};