import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent  implements OnInit {

 

_usuarioID: any = ''; // declaracio variable que puede contener cualquier tipo de valor
coleccionUsuario: Usuario[] = []; //array de objeto Usuario vacio, inicia como arreglo vacio
usuarioSelec!: Usuario // la variable se inicializara antes de ser utilizada

//pertenece a formularios reactivos
usuario = new FormGroup({
  uid: new FormControl(''), // id unico
  email:new FormControl('', Validators.required), // cadenas vacias, validators.required ---> campos obligatorio
  nombre: new FormControl('',Validators.required),
  fecha: new FormControl('',Validators.required),
  contrasena: new FormControl('',Validators.required),
})
col: any;




  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public servicioCrud : CrudService,
    public servicioAuth: AuthService,
  ) { }

  ngOnInit(): void {
    //cuando la ruta cambia, los parametros de la ruta tambien cambian ---> el codigo se ejecuta
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {//contiene parametros de la ruta actual
      this._usuarioID = params.get("uid");//obtiene id unicos de la URL y se le asigna a "_usuarioID"
      if (this._usuarioID) {// se verifica si _usuarioID tiene un valor ---> hay id de usuario en la URL
          this.prepareDataForUpdate();// por lo que se llama a esta funcion ---> prepara datos para actualizarlos
      }
  });
  }

  //llamamos a la funcion para actualizar datos
  prepareDataForUpdate(){  
    this.servicioCrud.obtenerUsuarioById(this._usuarioID).subscribe( //obtiene usuario por ID ---suscribe funcion a respuesta observable para manejar los datos
      docSnap => { //representa snapshot de los datos de usuario desde la BD --- se ejecuta cuando la respta esta disponible
        if (docSnap.exists){//verifica que los datos existan en la BD
          const usuario: any = docSnap.data();// si es asi, extrae los datos de la BD
          this.usuario = new FormGroup({// inicialiaza form reactivo --> controles correspondinentes a los campos de combustible
            uid: new FormControl(usuario.uid),
            nombre: new FormControl(usuario.nombre, Validators.required), // asigna valores de usuario siendo estos obligatorios
            email: new FormControl(usuario.email, Validators.required),
            fecha: new FormControl(usuario.fecha, Validators.required),
            contrasena: new FormControl(usuario.contrasena, Validators.required),
          })
        }
        
      }
    );

  }

  // guardar o actualziar info sobre usuario en la BD
  async guardarUsuario (){

    console.log("hola")

     // se crea un objeto 'nuevoUsuario" con los valores del formulario 'Musuario'
      let nuevoUsuario : Usuario = {
        uid: this.usuario.value.uid!,
        nombre: this.usuario.value.nombre!,
        email: this.usuario.value.email!,
        fecha: this.usuario.value.fecha!,
        contrasena: this.usuario.value.contrasena!,
        uidVehiculo: '',
        administrador: false
      };
      console.log(nuevoUsuario);// imprime para depuracion y verificar que los datos sean correctos
      let valor: any; // declaracion de variable para almacenar la respuesta de la BD
      if (nuevoUsuario.uid){// verifica si combustible tiene ID, si tiene se edita un objeto ya existente, si no se crea uno nuevo
        // Estamos editando un objeto existente
        valor = await this.servicioCrud.modificarUsuario(nuevoUsuario.uid, nuevoUsuario)
      }
      // else{
      //   // Estamos dando de alta un nuevo objeto
      //   valor = await this.servicioCrud.crearCombustible(nuevoUsuario);
      // }
      console.log(valor)// depuracion, se muestran datos en consola
  
    
    }

  mostrarEditarUsuario(usuarioSelec: Usuario){
    this.usuarioSelec = usuarioSelec;

    this.usuario.setValue({
      uid: usuarioSelec.uid,
      nombre: usuarioSelec.nombre,
      email: usuarioSelec.email,
      fecha: usuarioSelec.fecha,
      contrasena: usuarioSelec.contrasena,
      
    })
  }

  editarUsuario(){
    let datos: Usuario = {
      uid: this.usuarioSelec.uid,
      nombre: this.usuario.value.nombre!,
      email: this.usuario.value.email!,
      fecha: this.usuario.value.fecha!,
      contrasena: this.usuario.value.contrasena!,
      uidVehiculo: undefined,
      administrador: false
    }


    this.servicioCrud.modificarUsuario(this.usuarioSelec.uid, datos)
  }

  //llamamos funcion para CERRAR SESION
  async salir(){
    const res = await this.servicioAuth.cerrarSesion()
    .then(res => {
      alert("Ha cerrado sesion con exito.")
      console.log(res);

      this.router.navigate(['/carrusel']);
    })
  }

}
