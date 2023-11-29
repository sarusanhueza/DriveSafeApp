import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Combustible } from 'src/app/models/Mcombustible';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-form-combustible',
  templateUrl: './form-combustible.page.html',
  styleUrls: ['./form-combustible.page.scss'],
})
export class FormCombustiblePage implements OnInit {

  _combustibleID: any = '';
  coleccionCombustible: Combustible [] = [];
  combustibleSelec!: Combustible;
  ModalVisibleCombustible: boolean = false;

  Mcombustible = new FormGroup({
    uid: new FormControl(''),
    titulo: new FormControl('Combustible'),
    fecha: new FormControl('',Validators.required),
    litros: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required),
    gasto: new FormControl('$',Validators.required),
  })

col: any;


  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public servicioCrud : CrudService,
  
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this._combustibleID = params.get("uid");
      if (this._combustibleID) {
          this.prepareDataForUpdate();
      }
  });
  }

  prepareDataForUpdate(){  
    this.servicioCrud.obtenerCombustibleById(this._combustibleID).subscribe(
      docSnap => {
        if (docSnap.exists){
          const combustible: any = docSnap.data();
          this.Mcombustible = new FormGroup({
            uid: new FormControl(combustible.uid),
            titulo: new FormControl('Combustible'),
            fecha: new FormControl(combustible.fecha, Validators.required),
            litros: new FormControl(combustible.litros, Validators.required),
            tipo: new FormControl(combustible.tipo, Validators.required),
            gasto: new FormControl(combustible.gasto, Validators.required),
          })
        }
        
      }
    );

  }

  async guardarCombustible (){

    console.log("hola")
    //if(this.Mcombustible.valid){
      let nuevoCombustible : Combustible = {
        uid: this.Mcombustible.value.uid!,
        titulo: this.Mcombustible.value.titulo!,
        fecha: this.Mcombustible.value.fecha!,
        litros: this.Mcombustible.value.litros!,
        tipo: this.Mcombustible.value.tipo!,
        gasto: this.Mcombustible.value.gasto!,
      };
      console.log(nuevoCombustible);
      let valor: any;
      if (nuevoCombustible.uid){
        // Estamos editando un objeto existente
        valor = await this.servicioCrud.modificarCombustible(nuevoCombustible.uid, nuevoCombustible)
      }
      else{
        // Estamos dando de alta un nuevo objeto
        valor = await this.servicioCrud.crearCombustible(nuevoCombustible);
      }
      console.log(valor)
  
      //}
      //else{
      //  console.log(this.Mcombustible)
     // }
    }

    mostrarEditar(combustibleSelec: Combustible){
      this.combustibleSelec = combustibleSelec;

      this.Mcombustible.setValue({
        uid: combustibleSelec.uid,
        titulo: combustibleSelec.titulo,
        fecha: combustibleSelec.fecha,
        litros: combustibleSelec.litros,
        tipo: combustibleSelec.tipo,
        gasto: combustibleSelec.gasto
      })
    }

    editarCombustible(){
      let datos: Combustible = {
        uid: this.combustibleSelec.uid,
        titulo: this.Mcombustible.value.titulo!,
        fecha: this.Mcombustible.value.fecha!,
        litros: this.Mcombustible.value.litros!,
        tipo: this.Mcombustible.value.tipo!,
        gasto: this.Mcombustible.value.gasto!
      }


      this.servicioCrud.modificarCombustible(this.combustibleSelec.uid, datos)
    }

    mostrarBorrar(combustibleSelec: Combustible){
      this.ModalVisibleCombustible = true;
      this.combustibleSelec = combustibleSelec;
    }

    borrarCombustible(){
      this.servicioCrud.eliminarCombustible(this.combustibleSelec.uid);

    }


}