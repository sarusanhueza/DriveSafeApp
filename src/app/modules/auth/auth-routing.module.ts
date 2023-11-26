import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './page/registro/registro.component';
import { LoginComponent } from './page/login/login.component';
import { CarruselComponent } from '../inicio/componentes/carrusel/carrusel.component';
import { RegistroAutoComponent } from './page/registro-auto/registro-auto.component';
import { AdministradorLoginComponent } from './page/administrador-login/administrador-login.component';

const routes: Routes = [
  {
    path: "registro", component: RegistroComponent
  },
  {
    path: "login", component: LoginComponent
  }
  ,
  {path: "carrusel", component: CarruselComponent},
  
  {path:"registroAuto", component: RegistroAutoComponent},

  {path:'administrador-login', component:AdministradorLoginComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
