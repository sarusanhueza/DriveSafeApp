import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCombustiblePage } from './form-combustible.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'form',
    component: FormCombustiblePage
  },
  
];

@NgModule({
  imports: 
  
  [RouterModule.forChild(routes),
    ReactiveFormsModule,],
  

  exports: [RouterModule,
    ReactiveFormsModule,],
})
export class FormCombustiblePageRoutingModule {}
