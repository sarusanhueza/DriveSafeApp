import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Recordatorio } from 'src/app/models/Mrecordatorio';

@Component({
  selector: 'app-form-recordatorio',
  templateUrl: './form-recordatorio.page.html',
  styleUrls: ['./form-recordatorio.page.scss'],
})
export class FormRecordatorioPage implements OnInit {

  coleccionRecordario: Recordatorio[] = [];
  recordatorioSelec!: Recordatorio;

  Mrecordatorio = new FormGroup({
    titulo: new FormControl('Recordatorio',Validators.required),
    fecha: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    nombreEvento: new FormControl('', Validators.required),
    
  })

  col: any;

  constructor(
    public router: Router,
    public servicioCrud : CrudService,
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerRecordatorio().subscribe (recordatorio =>{
      this.coleccionRecordario = recordatorio;
    })
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
