import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenucitoPage } from './menucito.page';

const routes: Routes = [
  {
    path: '',
    component: MenucitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenucitoPageRoutingModule {}
