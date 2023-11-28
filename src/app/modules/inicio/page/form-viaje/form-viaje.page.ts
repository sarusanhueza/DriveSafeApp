import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Viaje } from 'src/app/models/Mviajes';

@Component({
  selector: 'app-form-viaje',
  templateUrl: './form-viaje.page.html',
  styleUrls: ['./form-viaje.page.scss'],
})
export class FormViajePage implements OnInit {

  _viajeID: any = '';
  coleccionViaje: Viaje[] = [];
  viajeSelec!: Viaje

  Mviaje = new FormGroup({
    uid: new FormControl(''),
    titulo: new FormControl('Viaje'),
    fecha: new FormControl('',Validators.required),
    nombreEvento: new FormControl('', Validators.required),
    lugarSalida: new FormControl('', Validators.required),
    lugarDestino: new FormControl('', Validators.required),
    
    
  })

  col: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public servicioCrud : CrudService,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this._viajeID = params.get("uid");
      if (this._viajeID) {
          this.prepareDataForUpdate();
      }
  });
  }

  
  prepareDataForUpdate(){  
    this.servicioCrud.obtenerViajeById(this._viajeID).subscribe(
      docSnap => {
        if (docSnap.exists){
          const viaje: any = docSnap.data();
          this.Mviaje = new FormGroup({
            uid: new FormControl(viaje.uid),
            titulo: new FormControl('Viaje'),
            fecha: new FormControl(viaje.fecha, Validators.required),
            nombreEvento: new FormControl(viaje.nombreEvento, Validators.required),
            lugarSalida: new FormControl(viaje.lugarSalida, Validators.required),
            lugarDestino: new FormControl(viaje.lugarDestino, Validators.required)
            
           
          
           
          })
        }
        
      }
    );

  }

  async agregarViaje (){
    console.log("hola")
    //if(this.Mcombustible.valid){
      let nuevoViaje : Viaje = {
        uid: this.Mviaje.value.uid!,
        titulo: this.Mviaje.value.titulo!,
        fecha: this.Mviaje.value.fecha!,
        nombreEvento: this.Mviaje.value.nombreEvento!,
        lugarSalida: this.Mviaje.value.lugarSalida!,
        lugarDestino: this.Mviaje.value.lugarDestino!,
       
      };
      console.log(nuevoViaje);
      let valor: any;
      if (nuevoViaje.uid){
        // Estamos editando un objeto existente
        valor = await this.servicioCrud.modificarViaje(nuevoViaje.uid, nuevoViaje)
      }
      else{
        // Estamos dando de alta un nuevo objeto
        valor = await this.servicioCrud.crearViaje(nuevoViaje);
      }
      console.log(valor)
    }

    mostrarEditar(viajeSelec: Viaje){
      this.viajeSelec = viajeSelec;

      this.Mviaje.setValue({
        uid:viajeSelec.uid,
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
