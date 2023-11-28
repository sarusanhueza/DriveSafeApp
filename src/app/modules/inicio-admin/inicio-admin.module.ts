import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioAdminRoutingModule } from './inicio-admin-routing.module';
import { IonicModule } from '@ionic/angular';
//componentes
import { ReconocimientoComponent } from './componentes/reconocimiento/reconocimiento.component';
import { Carrusel1Component } from './componentes/carrusel1/carrusel1.component';


@NgModule({
  declarations: [Carrusel1Component, ReconocimientoComponent],
  imports: [
    CommonModule,
    InicioAdminRoutingModule,
    //funcionamiento componentes ionic
    IonicModule
  ],
  exports:[
   ReconocimientoComponent, 
   Carrusel1Component
  ]
})
export class InicioAdminModule { }
