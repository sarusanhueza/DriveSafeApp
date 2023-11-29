import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCombustiblePageRoutingModule } from './form-combustible-routing.module';

import { FormCombustiblePage } from './form-combustible.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCombustiblePageRoutingModule
  ],
  declarations: [FormCombustiblePage]
})
export class FormCombustiblePageModule {}
