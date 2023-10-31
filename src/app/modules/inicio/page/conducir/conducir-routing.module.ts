import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConducirPage } from './conducir.page';

const routes: Routes = [
  {
    path: '',
    component: ConducirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConducirPageRoutingModule {}
