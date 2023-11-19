import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCombustiblePage } from './form-combustible.page';

const routes: Routes = [
  {
    path: '',
    component: FormCombustiblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCombustiblePageRoutingModule {}
