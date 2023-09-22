import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { RegistroComponent } from './page/registro/registro.component';


@NgModule({
  declarations: [
    LoginComponent, RegistroComponent
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { 
}
