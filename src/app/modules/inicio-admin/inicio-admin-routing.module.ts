import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAdminModule } from './inicio-admin.module';

const routes: Routes = [
  {path:'reconocimiento', component:InicioAdminModule}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioAdminRoutingModule { }
