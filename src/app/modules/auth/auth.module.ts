import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './page/login/login.component';
import { RegistroComponent } from './page/registro/registro.component';
import { IonicModule } from '@ionic/angular';
//servicio que nos provee
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    LoginComponent, RegistroComponent
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule
  ],
  //proveedor
  providers: [AuthService]
})
export class AuthModule { 
}
