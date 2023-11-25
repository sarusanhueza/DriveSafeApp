import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRecordatorioPage } from './form-recordatorio.page';

const routes: Routes = [
  {
    path: '',
    component: FormRecordatorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRecordatorioPageRoutingModule {}
