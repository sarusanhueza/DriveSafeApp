import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
   
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { EditarAutoComponent } from './componentes/editar-auto/editar-auto.component';
import { IonicModule } from '@ionic/angular';
//angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InicioComponent, CarruselComponent, EditarAutoComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,IonicModule, // IonicModule importar porque sino cuando pego compomenetes de ionic no se encuentra(importamos el padre)
    FormsModule, 
    ReactiveFormsModule                            
  ],
  exports:[
    CarruselComponent,
    EditarAutoComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InicioModule { }
