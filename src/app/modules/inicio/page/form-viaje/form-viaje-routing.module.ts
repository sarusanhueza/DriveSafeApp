import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormViajePage } from './form-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: FormViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormViajePageRoutingModule {}
