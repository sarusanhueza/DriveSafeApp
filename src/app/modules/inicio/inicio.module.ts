import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { IonMenu, IonMenuButton, IonicModule, MenuController } from '@ionic/angular';
import { MenuComponent } from './componentes/menu/menu.component';


//


@NgModule({
  declarations: [
    InicioComponent, CarruselComponent,MenuComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    IonicModule,

  ],
  exports:[
    CarruselComponent
  ]
})
export class InicioModule { }
