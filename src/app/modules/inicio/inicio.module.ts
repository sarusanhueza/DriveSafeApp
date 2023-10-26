import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { MapaComponent } from './componentes/mapa/mapa.component';


@NgModule({
  declarations: [
    InicioComponent, CarruselComponent, MapaComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
  ],
  exports:[
    CarruselComponent,
    MapaComponent
  ]
})
export class InicioModule { }
