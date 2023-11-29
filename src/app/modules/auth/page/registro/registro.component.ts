import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  hide = true; // input de contraseña
  password_type: string = 'password'

 
// DEFINIMOS DE FORMA PUBLICA EL SERVICIO 
  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public router: Router
    ) { }

    //importacion del modulo
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    email: '',
    fecha: '',
    contrasena: '',
  }

  Uid = '';

  coleccionUsuarios: Usuario[] = [];

  async registrarse(){
    const credenciales = {
      email: this.usuarios.email, //llama al modulo usuario y a su comp email
      contrasena: this.usuarios.contrasena

    };
    //console.log('Hola')

  const res = await this.servicioAuth.registrar(credenciales.email, credenciales.contrasena)

  //then toma una nueva promesa, toma la respuesta correcta
    .then(res => {
      alert("Se registro un usuario con exito!");

      this.router.navigate(["/inicio"]);
    })

    //toma el error
    .catch((error: string) =>
      alert("Hubo un error al crear el usuario \n" + error)
      );

    const uid = await this.servicioAuth.getUid();

    this.usuarios.uid = uid;

    this.guardarUser();
  }

  //funcion asincronica para guardar usuario
  async guardarUser(){
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
    .then(res => {
      console.log(this.usuarios);
    })
    .catch(error => {
      console.log('Error =>', error);
    })
  }

  async ngOnInit() {
    const uid = await this.servicioAuth.getUid();
    console.log(uid);
  }

  togglePasswordMode() {   
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
 }

}

