import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { EditarAutoComponent } from './componentes/editar-auto/editar-auto.component';


const routes: Routes = [
{path: 'inicio', component: InicioComponent  },
{path:'editarAuto', component:EditarAutoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
