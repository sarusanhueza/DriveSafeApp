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

  // define un objeto llamado "Usuario" con sus respectivas propiedades para utilizar la app
  usuarios: Usuario = {
    uid: '', //identificador unico del usuario
    uidVehiculo: '', //identificador unico del vehiculo del usuario
    nombre: '',
    email: '',
    contrasena: '',
    fecha: '',
    administrador: false // booleano para corrobar si el ingresante es usuario o administrador
  }

  // en el constructor declaramos los servicios a utilizar vinculados a la app
  constructor(
    public servicioAuth: AuthService, //servicio para autenticacion
    public servicioFirestore: FirestoreService, // servicio interactuar con la bd
    public router: Router // navegar entre paginas
  ){}

  // llamamos función iniciar() para INICIAR SESIÓN
  async iniciar(){
    //objeto con credenciales de los usuarios con propiedades email y contraseña
    const credenciales = {
      email: this.usuarios.email,
      contrasena: this.usuarios.contrasena
    };

    await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.contrasena)
    // si el inicio de sesion funciona, se ejecuta lo que esta dentro del bloque then y si no, lo del bloque catch
    .then(async res => {
      // servicioAuth --> obtener info del usuario// subscribe --> cambio en los datos
      (await this.servicioAuth.obtenerUsuario(res.user?.uid)).subscribe(
        docSnap => {  
          if (docSnap.exists){
            const user: any = docSnap.data();
            if (user.administrador){
              // Navegar a la pagina del administrador
              this.router.navigate(['/reconocimiento'])
            }
            else{
              // Navegar a la pagina de usuario
              this.router.navigate(['/menu/menucito'])
            }
          }
          else{
            console.log('Houston tenemos un problema!')
          }
          
        }
      );
      alert("Acceso concedido");

      
      
    })
    // MÉTODO CATCH -> ENCAPSULA UN FALLO
    .catch(error => {
      alert("Error al iniciar sesion\n"+error);

      console.log(credenciales.email);
    })


  }

}












