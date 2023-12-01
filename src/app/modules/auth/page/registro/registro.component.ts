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

    // define una variable 'usuarios' del tipo 'Usuario', contiene propiedades que pertenecen a un usuario
  usuarios: Usuario = {
    uid: '',
    uidVehiculo: '',
    nombre: '',
    email: '',
    fecha: '',
    contrasena: '',
    administrador: false 
    //son cadenas vacias
  }

  Uid = '';

  coleccionUsuarios: Usuario[] = [];

  //metodo asincrono que registrara usuarios obteniendo su email y contraseña de la cuenta 
  async registrarse(){
    const credenciales = {
      email: this.usuarios.email,
      contrasena: this.usuarios.contrasena

    };
    //console.log('Hola')

    //se utiliza al servicio de autenticacion para que el usuario sea registrado desde el metodo registrar
  const res = await this.servicioAuth.registrar(credenciales.email, credenciales.contrasena)

  // si la promesa se resuelve correctamente, entonces el usuario se creara exitosamente
    .then(res => {
      alert("Se registro un usuario con exito!");
      console.log(res)

      //navegara automaticamente al registroAuto
      this.router.navigate(["/registroAuto"]);
    })

    //en el caso contrario, si hay error, el mismo sera detectado por medio de catch
    .catch((error: string) =>
      alert("Hubo un error al crear el usuario \n" + error)
      );

    const uid = await this.servicioAuth.getUid();

    // se asigna uid al objeto de usuario 
    this.usuarios.uid = uid;

    //se llama a esta funcion para almacenar los datos del usuario
    this.guardarUser();
  }

  async guardarUser(){
    // llama al metodo 'agregarUsuario' para que se guarde la info del usuario
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
    .then(res => {
      //maneja el resultado si la operacion es exitosa
      console.log(this.usuarios);
    })
    .catch(error => {
      // manejara errores
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
