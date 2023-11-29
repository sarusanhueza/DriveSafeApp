import { Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';

import { MapaComponent } from './componentes/mapa/mapa.component';


import { MenuComponent } from './componentes/menu/menu.component';
import { CarruselComponent } from '../inicio/componentes/carrusel/carrusel.component';
import { FormCombustiblePageModule } from './page/form-combustible/form-combustible.module';
import { FormGastosPageModule } from './page/form-gastos/form-gastos.module';
import { FormRecordatorioPageModule } from './page/form-recordatorio/form-recordatorio.module';
import { FormViajePageModule } from './page/form-viaje/form-viaje.module';
import { EditarAutoComponent } from './componentes/editar-auto/editar-auto.component';


const routes: Routes = [
  //rutas secundarias
{path: 'inicio', component: InicioComponent  },
//metodo children para carga peresoza
{path: 'menu', component: MenuComponent, children: [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menucito',
  },
  {
    path: 'conducir',
    loadChildren: () => import('./page/conducir/conducir.module').then( m => m.ConducirPageModule)
  },
  {
    path: 'menucito',
    loadChildren: () => import('./page/menucito/menucito.module').then( m => m.MenucitoPageModule)
  },
  {
    path: 'form-combustible',
    loadChildren: () => import('./page/form-combustible/form-combustible.module').then( m => m.FormCombustiblePageModule)
  },
  {
    path: 'form-gastos',
    loadChildren: () => import('./page/form-gastos/form-gastos.module').then( m => m.FormGastosPageModule)
  },
  {
    path: 'form-recordatorio',
    loadChildren: () => import('./page/form-recordatorio/form-recordatorio.module').then( m => m.FormRecordatorioPageModule)
  },
  {
    path: 'form-viaje',
    loadChildren: () => import('./page/form-viaje/form-viaje.module').then( m => m.FormViajePageModule)
  },

]},


{path: 'carrusel', component: CarruselComponent},
  
{path: 'inicio', component: InicioComponent  }
,
{path: 'mapa-ubicaciones', component: MapaComponent},
{path:'editarAuto', component:EditarAutoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
