import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioAdminRoutingModule } from './inicio-admin-routing.module';
import { IonicModule } from '@ionic/angular';
//componentes
import { ReconocimientoComponent } from './componentes/reconocimiento/reconocimiento.component';


@NgModule({
  declarations: [ReconocimientoComponent],
  imports: [
    CommonModule,
    InicioAdminRoutingModule,
    //funcionamiento componentes ionic
    IonicModule
  ],
  exports:[
   ReconocimientoComponent
  ]
})
export class InicioAdminModule { }
