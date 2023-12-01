import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from '@angular/router';
import { ServiceVehiculoService } from '../../services/service-vehiculo.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  hide = true;
  password_type: string = 'password'

//definimos de manera publica a los servicios

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public router: Router,
    public servicioAuto:ServiceVehiculoService,
    ) { }

  usuarios: Usuario = {
    uid: '',
    uidVehiculo: '',
    nombre: '',
    email: '',
    fecha: '',
    contrasena: '',
    administrador: false
  }

  Uid = '';

  coleccionUsuarios: Usuario[] = [];

  async registrarse(){
    const credenciales = {
      email: this.usuarios.email,
      contrasena: this.usuarios.contrasena

    };
    //console.log('Hola')

  const res = await this.servicioAuth.registrar(credenciales.email, credenciales.contrasena)

    .then(res => {
      alert("Se registro un usuario con exito!");
      console.log(res)

      this.router.navigate(["/registroAuto"]);
    })

    .catch((error: string) =>
      alert("Hubo un error al crear el usuario \n" + error)
      );

    const uid = await this.servicioAuth.getUid();

    this.usuarios.uid = uid;

    this.guardarUser();
  }

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
