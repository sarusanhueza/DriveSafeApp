import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule
    
  ],
  exports: [NavbarComponent,
  MatIconModule,
MatButtonModule]
})
export class SharedModule { }
