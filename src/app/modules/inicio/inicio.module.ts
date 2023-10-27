import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';


@NgModule({
  declarations: [
    InicioComponent, CarruselComponent, ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
  ],
  exports:[
    CarruselComponent,
    ConfiguracionComponent
  ]
})
export class InicioModule { }
