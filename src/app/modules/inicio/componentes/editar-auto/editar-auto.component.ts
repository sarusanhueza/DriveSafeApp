import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components'

@Component({
  selector: 'app-editar-auto',
  templateUrl: './editar-auto.component.html',
  styleUrls: ['./editar-auto.component.scss'],
})


export class EditarAutoComponent {
  @ViewChild(IonModal)
  modal!: IonModal;

  message = '';
  nombre: string | undefined;
  patente: string | undefined;
  marca: string | undefined;
  tcombustible: string | undefined;


  //confirmaciones o cancelaciones pertenecientes a  propiedades
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    // encerramos en una constante verificados a todos los valores ingresados
    const verificados = {
      nombre: this.modal.dismiss(this.nombre,'confirm'),
      patente: this.modal.dismiss(this.patente,'confirm'),
      marca: this.modal.dismiss(this.marca,'confirm'),
      tcombustible: this.modal.dismiss(this.tcombustible,'confirm'),
    }

    return verificados.nombre, verificados.patente, verificados.marca, verificados.tcombustible;
  }

  //retornando confirmacion de propiedades
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = ` ${ev.detail.data}`;
      this.showAllValues()
    }
  }

  // showAllValues concatena todos los valores que fueron ingresados y los muestra
  showAllValues(){
    this.message = `Nombre: ${this.nombre}, Patente: ${this.patente}, Marca: ${this.marca}, Tipo de combustible: ${this.tcombustible}`;
  }
}
