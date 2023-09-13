import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';


@NgModule({
  declarations: [
    InicioComponent, CarruselComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
  ],
  exports:[
    CarruselComponent
  ]
})
export class InicioModule { }
