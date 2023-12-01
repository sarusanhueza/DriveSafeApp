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
    this.servicioCrud.obtenerUsuarioById(this._usuarioID).subscribe(
      docSnap => {
        if (docSnap.exists){
          const usuario: any = docSnap.data();
          this.usuario = new FormGroup({
            uid: new FormControl(usuario.uid),
            nombre: new FormControl(usuario.nombre, Validators.required),
            email: new FormControl(usuario.email, Validators.required),
            fecha: new FormControl(usuario.fecha, Validators.required),
            contrasena: new FormControl(usuario.contrasena, Validators.required),
          })
        }
        
      }
    );

  }

  async guardarUsuario (){

    console.log("hola")
    //if(this.Mcombustible.valid){
      let nuevoUsuario : Usuario = {
        uid: this.usuario.value.uid!,
        nombre: this.usuario.value.nombre!,
        email: this.usuario.value.email!,
        fecha: this.usuario.value.fecha!,
        contrasena: this.usuario.value.contrasena!,
        uidVehiculo: '',
        administrador: false
      };
      console.log(nuevoUsuario);
      let valor: any;
      if (nuevoUsuario.uid){
        // Estamos editando un objeto existente
        valor = await this.servicioCrud.modificarUsuario(nuevoUsuario.uid, nuevoUsuario)
      }
      // else{
      //   // Estamos dando de alta un nuevo objeto
      //   valor = await this.servicioCrud.crearCombustible(nuevoUsuario);
      // }
      console.log(valor)
  
      //}
      //else{
      //  console.log(this.Mcombustible)
     // }
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
