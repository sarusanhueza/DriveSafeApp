import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioAdminRoutingModule } from './inicio-admin-routing.module';
import { IonicModule } from '@ionic/angular';
//componentes
import { ReconocimientoComponent } from './componentes/reconocimiento/reconocimiento.component';

import { MenuUsuariosComponent } from './componentes/menu-usuarios/menu-usuarios.component';


@NgModule({
  declarations: [ ReconocimientoComponent, MenuUsuariosComponent],
  imports: [
    CommonModule,
    InicioAdminRoutingModule,
    //funcionamiento componentes ionic
    IonicModule
  ],
  exports:[
   ReconocimientoComponent, 
  MenuUsuariosComponent
  ]
})
export class InicioAdminModule { }
