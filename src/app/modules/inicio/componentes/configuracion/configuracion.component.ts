import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent  implements OnInit {

  @ViewChild(IonModal)
  modal_!: IonModal;

  @ViewChild(IonModal)
  modal!: IonModal;
  
//  @ViewChild(IonModal)
  
  message = 'nombre';
  message1 = '00/00/00';
  message2 = 'cambiar contraseña';
  message3 = 'cambiar correo';


  name!: string;
  fecha!: string;

  ngOnInit() {
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `${ev.detail.data}`;
    }
  }

  cancel1() {
    this.modal_.dismiss(null, 'cancel');
    //if (this.modal1) {
    //  this.modal1.dismiss(null, 'cancel');
    // } else {
    //  this.modal1.dismiss(null, 'cancel');
    //  console.error('El modal1 no está definido');
    // }
  }

  confirm1() {
    if (this.modal_) {
      this.modal_.dismiss(this.fecha, 'confirm');
    } 
  }

  onWillDismiss1(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message1 = `${ev.detail.data}!`;
    }
  }
 




  constructor() { }



}
