import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { IonicModule } from '@ionic/angular';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { MenuComponent } from './componentes/menu/menu.component';

import { EditarAutoComponent } from './componentes/editar-auto/editar-auto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InicioComponent, CarruselComponent, MapaComponent, EditarAutoComponent, MenuComponent, ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    //funcionamiento componentes ionic
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CarruselComponent,
    ConfiguracionComponent,
    MapaComponent,
    EditarAutoComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InicioModule { }




