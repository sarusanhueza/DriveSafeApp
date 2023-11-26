import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormViajePageRoutingModule } from './form-viaje-routing.module';

import { FormViajePage } from './form-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormViajePageRoutingModule
  ],
  declarations: [FormViajePage]
})
export class FormViajePageModule {}
