import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
   
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { EditarAutoComponent } from './componentes/editar-auto/editar-auto.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EditarAuto1Component } from './componentes/editar-auto1/editar-auto1.component';



@NgModule({
  declarations: [
    InicioComponent, CarruselComponent, EditarAutoComponent, EditarAuto1Component
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,IonicModule, // IonicModule importar porque sino cuando pego compomenetes de ionic no se encuentra(importamos el padre)
    FormsModule                              
  ],
  exports:[
    CarruselComponent,
    EditarAutoComponent,
    EditarAuto1Component
  ]
})
export class InicioModule { }
