import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { RegistroComponent } from './page/registro/registro.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent, RegistroComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    IonicModule,

  ]
})
export class AuthModule {
}
