import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CrudService } from '../../services/crud.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent  implements OnInit {

 

_usuarioID: any = '';
coleccionUsuario: Usuario[] = [];
usuarioSelec!: Usuario 

usuario = new FormGroup({
  uid: new FormControl(''),
  email:new FormControl('', Validators.required),
  nombre: new FormControl('',Validators.required),
  fecha: new FormControl('',Validators.required),
  contrasena: new FormControl('',Validators.required),
})
col: any;




  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public servicioCrud : CrudService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this._usuarioID = params.get("uid");
      if (this._usuarioID) {
          this.prepareDataForUpdate();
      }
  });
  }

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



}
