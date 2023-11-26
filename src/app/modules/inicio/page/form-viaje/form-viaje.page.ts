import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Viaje } from 'src/app/models/Mviajes';

@Component({
  selector: 'app-form-viaje',
  templateUrl: './form-viaje.page.html',
  styleUrls: ['./form-viaje.page.scss'],
})
export class FormViajePage implements OnInit {

  coleccionViaje: Viaje[] = [];
  viajeSelec!: Viaje

  Mviaje = new FormGroup({
    titulo: new FormControl('Viaje',Validators.required),
    fecha: new FormControl('',Validators.required),
    nombreEvento: new FormControl('', Validators.required),
    lugarSalida: new FormControl('', Validators.required),
    lugarDestino: new FormControl('', Validators.required),
    
    
  })

  col: any;

  constructor(
    public router: Router,
    public servicioCrud : CrudService,
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerViaje().subscribe (viaje =>{
      this.coleccionViaje = viaje;
    })
  }

  async agregarViaje (){
    console.log("hola")
    //if(this.Mcombustible.valid){
      let nuevoViaje : Viaje = {
        uid: '',
        titulo: this.Mviaje.value.titulo!,
        fecha: this.Mviaje.value.fecha!,
        nombreEvento: this.Mviaje.value.nombreEvento!,
        lugarSalida: this.Mviaje.value.lugarSalida!,
        lugarDestino: this.Mviaje.value.lugarDestino!,
       
      };
      console.log(nuevoViaje);
      const valor = await this.servicioCrud.crearViaje(nuevoViaje);
      console.log(valor)
  
      //}
      //else{
      //  console.log(this.Mcombustible)
     // }
    }

    mostrarEditar(viajeSelec: Viaje){
      this.viajeSelec = viajeSelec;

      this.Mviaje.setValue({
        titulo: viajeSelec.titulo,
        fecha: viajeSelec.fecha,
        nombreEvento: viajeSelec.nombreEvento,
        lugarSalida: viajeSelec.lugarSalida,
        lugarDestino: viajeSelec.lugarDestino,
        
        
        
      })
    }

    editarViaje(){
      let datos: Viaje = {
        uid: this.viajeSelec.uid,

        titulo: this.Mviaje.value.titulo!,
        fecha: this.Mviaje.value.fecha!,
        nombreEvento: this.Mviaje.value.nombreEvento!,
        lugarSalida: this.Mviaje.value.lugarSalida!,
        lugarDestino: this.Mviaje.value.lugarDestino!,
        

      }


      this.servicioCrud.modificarViaje(this.viajeSelec.uid, datos)
    }

    
    mostrarBorrar(viajeSelec: Viaje){
      //this.ModalVisibleCombustible = true;
      this.viajeSelec = viajeSelec;
    }

    borrarGastos(){
      this.servicioCrud.eliminarViaje(this.viajeSelec.uid);

    }

}
