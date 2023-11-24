import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenucitoPageRoutingModule } from './menucito-routing.module';

import { MenucitoPage } from './menucito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MenucitoPageRoutingModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MenucitoPage]
})
export class MenucitoPageModule {}
