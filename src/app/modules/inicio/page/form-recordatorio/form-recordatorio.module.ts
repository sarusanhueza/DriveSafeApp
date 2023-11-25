import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRecordatorioPageRoutingModule } from './form-recordatorio-routing.module';

import { FormRecordatorioPage } from './form-recordatorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormRecordatorioPageRoutingModule
  ],
  declarations: [FormRecordatorioPage]
})
export class FormRecordatorioPageModule {}
