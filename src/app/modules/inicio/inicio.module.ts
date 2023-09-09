import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { ComponentesComponent } from './componentes/componentes.component';


@NgModule({
  declarations: [
    InicioComponent,
    ComponentesComponent 
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
  ],
  exports:[
    ComponentesComponent
  ]
})
export class InicioModule { }
