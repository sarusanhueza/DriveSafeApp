import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
{path: '', component: InicioComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
