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

  // guardar o actualizar info sobre combustible en la BD
  async guardarCombustible (){

    console.log("hola")
    
    // se crea un objeto 'nuevoCombustible" con los valores del formulario 'Mcombustible'
      let nuevoCombustible : Combustible = {
        uid: this.Mcombustible.value.uid!,
        titulo: this.Mcombustible.value.titulo!,
        fecha: this.Mcombustible.value.fecha!,
        litros: this.Mcombustible.value.litros!,
        tipo: this.Mcombustible.value.tipo!,
        gasto: this.Mcombustible.value.gasto!,
      };
      console.log(nuevoCombustible); // imprime para depuracion y verificar que los datos sean correctos
      let valor: any; // declaracion de variable para almacenar la respuesta de la BD
      if (nuevoCombustible.uid){ // verifica si combustible tiene ID, si tiene se edita un objeto ya existente, si no se crea uno nuevo
        // Estamos editando un objeto existente
        valor = await this.servicioCrud.modificarCombustible(nuevoCombustible.uid, nuevoCombustible)// se actualiza en la BD
      }
      else{
        // Estamos dando de alta un nuevo objeto
        valor = await this.servicioCrud.crearCombustible(nuevoCombustible);
      }
      console.log(valor) // depuracion, se muestran datos en consola
  
      
    }

    //funcion para mostrar los datos de un objeto para su edicion
    mostrarEditar(combustibleSelec: Combustible){
      //asigna el objeto combustibleSelec a la propiedad combustibleSelec
      this.combustibleSelec = combustibleSelec;

      //configura el form reactivo Mcombustible con los valores del objeto combustibleSelec
      this.Mcombustible.setValue({ // formulario va a mostrar los detalles del combustible seleccionado
        uid: combustibleSelec.uid,
        titulo: combustibleSelec.titulo,
        fecha: combustibleSelec.fecha,
        litros: combustibleSelec.litros,
        tipo: combustibleSelec.tipo,
        gasto: combustibleSelec.gasto
      })
    }

    //recopila datos editdos en el form y actualiza los datos en la BD
    editarCombustible(){
      // asignamos variable 'datos' con los valores ya editados del form 'Mcombustible'
      let datos: Combustible = {
        uid: this.combustibleSelec.uid,
        titulo: this.Mcombustible.value.titulo!,
        fecha: this.Mcombustible.value.fecha!,
        litros: this.Mcombustible.value.litros!,
        tipo: this.Mcombustible.value.tipo!,
        gasto: this.Mcombustible.value.gasto!
      }

       // se llama al servicio para modificar de combustible los datos en la BD
      this.servicioCrud.modificarCombustible(this.combustibleSelec.uid, datos)// pasa el id del combustible sinedo editado y datos con las propiedades ya actualizadas
    }

    // funcion para preparar el objeto para ser eliminado
    mostrarBorrar(combustibleSelec: Combustible){
      
      this.combustibleSelec = combustibleSelec; //mantiene el objeto seleccionado cuando se va a eliminar
    }

    //funcion para eliminar la nota
    borrarCombustible(){
      //llamamos al metodo 'eliminarCombustible' del servicio para eliminar la nota de la BD desde su ID
      this.servicioCrud.eliminarCombustible(this.combustibleSelec.uid);

    }


}
