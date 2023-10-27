import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
const routes: Routes = [
{path: 'inicio', component: InicioComponent  },
{path: 'configuracion', component: ConfiguracionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
