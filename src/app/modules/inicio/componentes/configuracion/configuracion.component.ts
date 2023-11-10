import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent  implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal; 
  modal1!:IonModal;

  message = 'nombre';
  message1 = '00/00/00';
  message2 = 'cambiar contraseña';
  message3 = 'cambiar correo';


  name!: string;
  fecha!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.modal1.dismiss(this.fecha, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `${ev.detail.data}!`;
    }
  }


  onWillDismiss1(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message1 = `${ev.detail.data}!`;
    }
  }
 


 

  constructor() { }

  ngOnInit() {}

}
