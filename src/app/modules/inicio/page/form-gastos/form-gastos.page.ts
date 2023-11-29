import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Gastos } from 'src/app/models/Mgastos';

@Component({
  selector: 'app-form-gastos',
  templateUrl: './form-gastos.page.html',
  styleUrls: ['./form-gastos.page.scss'],
})
export class FormGastosPage implements OnInit {

  _gastosID: any = '';
  coleccionGastos: Gastos[] = [];
  gastoSelec!: Gastos;


  Mgastos = new FormGroup({
    uid: new FormControl(''),
    titulo: new FormControl('Gastos'),
    fecha: new FormControl('', Validators.required),
    nombreArticulo: new FormControl('', Validators.required),
    precio: new FormControl('$', Validators.required),
  })

  col: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public servicioCrud : CrudService,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this._gastosID = params.get("uid");
      if (this._gastosID) {
          this.prepareDataForUpdate();
      }
  });
    // this.servicioCrud.obtenerGastos().subscribe (gasto =>{
    //   this.coleccionGastos = gasto;
    // })
  }

  prepareDataForUpdate(){  
    this.servicioCrud.obtenerGastosById(this._gastosID).subscribe(
      docSnap => {
        if (docSnap.exists){
          const gastos: any = docSnap.data();
          this.Mgastos = new FormGroup({
            uid: new FormControl(gastos.uid),
            titulo: new FormControl('Gastos'),
            fecha: new FormControl(gastos.fecha, Validators.required),
            nombreArticulo: new FormControl(gastos.nombreArticulo, Validators.required),
            precio: new FormControl(gastos.precio, Validators.required),
           
          })
        }
        
      }
    );

  }


  async agregarGastos (){
    console.log("hola")
    //if(this.Mcombustible.valid){
      let nuevoGastos : Gastos = {
        uid: this.Mgastos.value.uid!,
        titulo: this.Mgastos.value.titulo!,
        fecha: this.Mgastos.value.fecha!,
        nombreArticulo: this.Mgastos.value.nombreArticulo!,
        precio: this.Mgastos.value.precio!,
       
      };
      console.log(nuevoGastos);
      let valor: any;
      if (nuevoGastos.uid){
      valor = await this.servicioCrud.modificarGastos(nuevoGastos.uid, nuevoGastos);
      
      }
      else{
        valor = await this.servicioCrud.crearGastos(nuevoGastos)
      }
      console.log(valor)
      //}
      //else{
      //  console.log(this.Mcombustible)
     // }
    }

    mostrarEditar(gastoSelec: Gastos){
      this.gastoSelec = gastoSelec;

      this.Mgastos.setValue({
        uid: gastoSelec.uid,
        titulo: gastoSelec.titulo,
        fecha: gastoSelec.fecha,
        nombreArticulo: gastoSelec.nombreArticulo,
        precio: gastoSelec.precio,
        
      })
    }

    editarGastos(){
      let datos: Gastos = {
        uid: this.gastoSelec.uid,

        titulo: this.Mgastos.value.titulo!,
        fecha: this.Mgastos.value.fecha!,
        nombreArticulo: this.Mgastos.value.nombreArticulo!,
        precio: this.Mgastos.value.nombreArticulo!,

      }


      this.servicioCrud.modificarGastos(this.gastoSelec.uid, datos)
    }

    mostrarBorrar(gastoSelecc: Gastos){
      //this.ModalVisibleCombustible = true;
      this.gastoSelec = gastoSelecc;
    }

    borrarGastos(){
      this.servicioCrud.eliminarGastos(this.gastoSelec.uid);

    }
}
