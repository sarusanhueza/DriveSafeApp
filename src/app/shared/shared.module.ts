import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';





@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
    
  ],
  exports: [NavbarComponent,
  MatIconModule,
MatButtonModule]
})
export class SharedModule { }
