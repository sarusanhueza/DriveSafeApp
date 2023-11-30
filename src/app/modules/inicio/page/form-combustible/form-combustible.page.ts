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

  _combustibleID: any = ''; // declaracion de variable que puede contenr cualquier tipo de valor
  coleccionCombustible: Combustible [] = []; //array de objeto Combustible vacio, inicia como arreglo vacio
  combustibleSelec!: Combustible; // la variable se inicializara antes de ser utilizada
  ModalVisibleCombustible: boolean = false;

  //pertenece a formularios reactivos
  Mcombustible = new FormGroup({ 
    uid: new FormControl(''), // identificador unico
    titulo: new FormControl('Combustible'), // valor inicial "combustible"
    fecha: new FormControl('',Validators.required), // cadena vacia, validators.required --> fecha es obligatoria
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
    //cuando la ruta cambia, los parametros de la ruta tambien cambian ---> el codigo se ejecuta
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => { //contiene parametros de la ruta actual
      this._combustibleID = params.get("uid");//obtiene id unicos de la URL y se le asigna a "_combustibleID"
      if (this._combustibleID) { // se verifica si _combustibleID tiene un valor ---> hay id de combustible en la URL
          this.prepareDataForUpdate(); // por lo que se llama a esta funcion ---> prepara datos para actualizarlos
      }
  });
  }

  //llamamos a la funcion para actualizar datos
  prepareDataForUpdate(){  
    this.servicioCrud.obtenerCombustibleById(this._combustibleID).subscribe( //obtiene combustible por ID --- suscribe funcion a respuesta observable para manejar los datos
      docSnap => { //representa snapshot de los datos de combustible desde la BD --- se ejecuta cuando la respta esta disponible
        if (docSnap.exists){ // verifica que los datos existane en la BD
          const combustible: any = docSnap.data(); // si es asi, extrae los datos de la BD
          this.Mcombustible = new FormGroup({ // inicialiaza form reactivo --> controles correspondinentes a los campos de combustible
            uid: new FormControl(combustible.uid),
            titulo: new FormControl('Combustible'),
            fecha: new FormControl(combustible.fecha, Validators.required), // asigna valores de combustible siendo estos obligatorios
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
