import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { MapaComponent } from './componentes/mapa/mapa.component';

const routes: Routes = [

{path: 'inicio', component: InicioComponent  }
,
{path: 'mapa-ubicaciones', component: MapaComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
