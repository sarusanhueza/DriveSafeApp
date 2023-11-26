import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
//componentes del modulo "Auth"
import { RegistroComponent } from './page/registro/registro.component';
import { LoginComponent } from './page/login/login.component';
import { RegistroAutoComponent } from './page/registro-auto/registro-auto.component';
//servicio que nos provee
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { AdministradorLoginComponent } from './page/administrador-login/administrador-login.component';




@NgModule({
  declarations: [
    LoginComponent, RegistroComponent, RegistroAutoComponent, AdministradorLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    IonicModule
  ], exports:[
     
  ],
  providers: [AuthService]

})
export class AuthModule {
}
