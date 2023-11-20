import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAdminModule } from './inicio-admin.module';
import { ReconocimientoComponent } from './componentes/reconocimiento/reconocimiento.component';

const routes: Routes = [
  {path:'reconocimiento', component:ReconocimientoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioAdminRoutingModule { }
