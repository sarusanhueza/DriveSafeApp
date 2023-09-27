import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any;
  iniciarSesion(email: string, contrasena: string) {
    return this.auth.signInWithEmailAndPassword(email, contrasena);
  }

  constructor() { }
}
