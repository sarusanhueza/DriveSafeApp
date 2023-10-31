import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConducirPageRoutingModule } from './conducir-routing.module';

import { ConducirPage } from './conducir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConducirPageRoutingModule
  ],
  declarations: [ConducirPage]
})
export class ConducirPageModule {}
