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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResgistroAuto2Component } from './page/resgistro-auto2/resgistro-auto2.component';




@NgModule({
  declarations: [
    LoginComponent, RegistroComponent, RegistroAutoComponent, ResgistroAuto2Component
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    IonicModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
   LoginComponent,
   RegistroComponent,
   RegistroAutoComponent,
    ResgistroAuto2Component,
    FormsModule,
    ReactiveFormsModule
  ],
    
  providers: [AuthService]

})
export class AuthModule {
}
