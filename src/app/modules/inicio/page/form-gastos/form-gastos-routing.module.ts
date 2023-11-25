import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormGastosPage } from './form-gastos.page';

const routes: Routes = [
  {
    path: '',
    component: FormGastosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormGastosPageRoutingModule {}
