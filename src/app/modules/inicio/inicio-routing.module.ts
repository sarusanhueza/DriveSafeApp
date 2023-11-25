import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { EditarAutoComponent } from './componentes/editar-auto/editar-auto.component';
import { EditarAuto1Component } from './componentes/editar-auto1/editar-auto1.component';

const routes: Routes = [
{path: 'inicio', component: InicioComponent  },
{path:'editarAuto', component:EditarAutoComponent},
{path:'editarAuto1', component:EditarAuto1Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
