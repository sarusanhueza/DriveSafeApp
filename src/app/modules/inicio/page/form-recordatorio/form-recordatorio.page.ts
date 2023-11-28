import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Recordatorio } from 'src/app/models/Mrecordatorio';

@Component({
  selector: 'app-form-recordatorio',
  templateUrl: './form-recordatorio.page.html',
  styleUrls: ['./form-recordatorio.page.scss'],
})
export class FormRecordatorioPage implements OnInit {

  _recordatorioID: any = '';
  coleccionRecordario: Recordatorio[] = [];
  recordatorioSelec!: Recordatorio;

  Mrecordatorio = new FormGroup({
    uid: new FormControl(''),
    titulo: new FormControl('Recordatorio',Validators.required),
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    nombreEvento: new FormControl('', Validators.required),
    
  })

  col: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public servicioCrud : CrudService,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this._recordatorioID = params.get("uid");
      if (this._recordatorioID) {
          this.prepareDataForUpdate();
      }
  });
    // this.servicioCrud.obtenerRecordatorio().subscribe (recordatorio =>{
    //   this.coleccionRecordario = recordatorio;
    // })
  }

  prepareDataForUpdate(){  
    this.servicioCrud.obtenerRecordatoriobyId(this._recordatorioID).subscribe(
      docSnap => {
        if (docSnap.exists){
          const recordatorio: any = docSnap.data();
          this.Mrecordatorio = new FormGroup({
            uid: new FormControl(recordatorio.uid),
            titulo: new FormControl('Recordatorio'),
            fecha: new FormControl(recordatorio.fecha, Validators.required),
            hora: new FormControl(recordatorio.hora, Validators.required),
            nombreEvento: new FormControl(recordatorio.nombreEvento, Validators.required),
          
           
          })
        }
        
      }
    );

  }

  async agregarRecordatorio (){
    console.log("hola")
    //if(this.Mcombustible.valid){
      let nuevoRecordatorio : Recordatorio = {
        uid: '',
        titulo: this.Mrecordatorio.value.titulo!,
        fecha: this.Mrecordatorio.value.fecha!,
        hora: this.Mrecordatorio.value.hora!,
        nombreEvento: this.Mrecordatorio.value.nombreEvento!,
       
       
      };
      console.log(nuevoRecordatorio);
      const valor = await this.servicioCrud.crearRecordatorio(nuevoRecordatorio);
      console.log(valor)
  
      //}
      //else{
      //  console.log(this.Mcombustible)
     // }
    }

    mostrarEditar(recordatorioSelec: Recordatorio){
      this.recordatorioSelec = recordatorioSelec;

      this.Mrecordatorio.setValue({
        uid: recordatorioSelec.uid,
        titulo: recordatorioSelec.titulo,
        fecha: recordatorioSelec.fecha,
        hora: recordatorioSelec.hora,
        nombreEvento: recordatorioSelec.nombreEvento,
        
        
      })
    }

    editarRecordatorio(){
      let datos: Recordatorio = {
        uid: this.recordatorioSelec.uid,

        titulo: this.Mrecordatorio.value.titulo!,
        fecha: this.Mrecordatorio.value.fecha!,
        hora: this.Mrecordatorio.value.hora!,
        nombreEvento: this.Mrecordatorio.value.nombreEvento!,
        

      }


      this.servicioCrud.modificarRecordatorio(this.recordatorioSelec.uid, datos)
    }

    mostrarBorrar(recordatorioSelec: Recordatorio){
      //this.ModalVisibleCombustible = true;
      this.recordatorioSelec = recordatorioSelec;
    }

    borrarGastos(){
      this.servicioCrud.eliminarRecordatorio(this.recordatorioSelec.uid);

    }


}
