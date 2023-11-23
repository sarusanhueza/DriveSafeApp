import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
//componentes del modulo "Auth"
import { RegistroComponent } from './page/registro/registro.component';
import { LoginComponent } from './page/login/login.component';
import { ResgistroAuto2Component } from './page/resgistro-auto2/resgistro-auto2.component';
//servicio que nos provee
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LoginComponent, RegistroComponent, ResgistroAuto2Component
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
    ResgistroAuto2Component,
    FormsModule,
    ReactiveFormsModule
  ],
    
  providers: [AuthService]

})
export class AuthModule {
}
