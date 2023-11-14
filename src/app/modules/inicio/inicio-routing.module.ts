import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { CarruselComponent } from '../inicio/componentes/carrusel/carrusel.component';

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

]},


{path: 'carrusel', component: CarruselComponent},  {
    path: 'form-combustible',
    loadChildren: () => import('./page/form-combustible/form-combustible.module').then( m => m.FormCombustiblePageModule)
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
