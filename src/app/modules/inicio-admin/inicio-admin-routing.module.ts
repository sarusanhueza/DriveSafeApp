import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAdminModule } from './inicio-admin.module';
import { ReconocimientoComponent } from './componentes/reconocimiento/reconocimiento.component';
import { Carrusel1Component } from './componentes/carrusel1/carrusel1.component';

const routes: Routes = [
  //rutas hijas del modulo "inicio-admin"
  {path:'reconocimiento', component:ReconocimientoComponent},
  {path:'carrusel1', component:Carrusel1Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioAdminRoutingModule { }
