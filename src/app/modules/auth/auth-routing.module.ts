import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './page/registro/registro.component';
import { LoginComponent } from './page/login/login.component';
import { CarruselComponent } from '../inicio/componentes/carrusel/carrusel.component';
import { ResgistroAuto2Component } from './page/resgistro-auto2/resgistro-auto2.component';

const routes: Routes = [
  {
    path: "registro", component: RegistroComponent
  },
  {
    path: "login", component: LoginComponent
  }
  ,
  {path: "carrusel", component: CarruselComponent},
  

  {path:"registroAuto2", component:ResgistroAuto2Component},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
