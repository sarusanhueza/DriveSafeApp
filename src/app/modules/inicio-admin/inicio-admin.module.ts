import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from '../inicio/inicio-routing.module';

//importaciones de los componentes pertenecientes al modulo  "inicio-admin"
import { ReconocimientoComponent } from './componentes/reconocimiento/reconocimiento.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ReconocimientoComponent],
  imports: [
    CommonModule, 
    InicioRoutingModule,

    //funcionamiento componentes ionic
    IonicModule
  ],exports:[
    ReconocimientoComponent
  ]
})
export class InicioAdminModule { }
