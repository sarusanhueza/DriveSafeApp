import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { CarruselComponent } from '../inicio/componentes/carrusel/carrusel.component';

const routes: Routes = [
  //rutas secundarias
{path: 'inicio', component: InicioComponent  },
{path: 'menu', component: MenuComponent},
{path: "carrusel", component: CarruselComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
