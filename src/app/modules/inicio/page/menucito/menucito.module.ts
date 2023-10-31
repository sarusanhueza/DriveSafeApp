import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenucitoPageRoutingModule } from './menucito-routing.module';

import { MenucitoPage } from './menucito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenucitoPageRoutingModule
  ],
  declarations: [MenucitoPage]
})
export class MenucitoPageModule {}
