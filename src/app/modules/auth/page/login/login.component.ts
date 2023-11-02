import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  usuarios: Usuario = {
    uid: '',
    nombre: '',
    email: '',
    contrasena: '',
    fecha: ''
  }

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public router: Router
  ){}

  // llamamos función para INICIAR SESIÓN
  async iniciar(){
    const credenciales = {
      email: this.usuarios.email,
      contrasena: this.usuarios.contrasena
    };

    const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.contrasena)

    .then(res => {
      this.router.navigate(["/menu"])
    })
    // MÉTODO THEN -> ENCAPSULA UN FALLO
    .catch(error => {
      alert("Error al ininciar sesion\n"+error);

      console.log(credenciales.email);
    })
  }
}




