import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioAdminRoutingModule } from './inicio-admin-routing.module';


//componentes
import { ReconocimientoComponent } from './componentes/reconocimiento/reconocimiento.component';
import { Carrusel1Component } from './componentes/carrusel1/carrusel1.component';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [Carrusel1Component, ReconocimientoComponent],
  imports: [
    CommonModule,
    InicioAdminRoutingModule,
    //funcionamiento componentes ionic
  IonicModule
  
  ],
  exports:[
    
   Carrusel1Component,
   ReconocimientoComponent
  ]
})
export class InicioAdminModule { }
